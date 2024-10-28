import urllib
from urllib import request
from django.http import JsonResponse
from django.db.models.sql.constants import GET_ITERATOR_CHUNK_SIZE

# Things needed to get the response:
# Type of request for login/ getting users top tracks: GET
# type (string): type of entity to return, valid values: artists || tracks
# time_range (string): over what time frame affinities are computed
# - valid values: long_term (~1 year of data and including all new data as it becomes available)
# limit (integer): max number of items to return
# - default: 20
# - limit = 3 (for our purposes)
# - offset integer (index of first item to return (default is 0))

#importing requests
import requests
from django.shortcuts import redirect
from datetime import datetime, timedelta
# app.secret_key = '<KEY>' --> do we need this like actually?

# setting up constants we need to use

client_ID = '3eada3a2c1bd462c982924660a5d7e84'
client_secret = '06827ed33b6447fabf2bac7dfbd0bf94'
redirect_URI = 'http://127.0.0.1:8000/'

auth_URL = 'https://accounts.spotify.com/authorize'
token_URL = 'https://accounts.spotify.com/api/token'
api_base_URL= 'https://accounts.spotify.com/v1/'

# need to make a route (?) that sets the default page where they can log in --> html

#declaring permissions and making a request to spotify's API- permissions we need and what will happen
def gettingLogin(request):
  scope = 'user-read-private'
  params = {
    'client_id': client_ID,
    'response_type': 'code',
    'scope': scope,
    'redirect_uri': redirect_URI,
    'show_dialog': True #by default it is false, but for debugging/testing we need to log in every time, once it works and we finish testing we can remove this
  }
  auth_url = f"{auth_URL}?{urllib.parse.urlencode(params)}"

  return redirect(auth_url)

#callback?
def callback():
  #eliminating all the options before arriving at success state
  if 'error' in request.GET:
    return JsonResponse({"error": request.GET['error']})
  if 'code' in request.GET:
    req_body = {
      'code': request.GET['code'],
      'grant_type': 'authorization_code',
      'redirect_uri': redirect_URI,
      'client_id': client_ID,
      'client_secret': client_secret,
    }
  response = requests.post(token_URL, req_body)
  token_info = response.json()
  if 'access_token' in token_info:
    request.session['access_token'] = token_info['access_token'] #requests to spotify API
    request.session['refresh_token'] = token_info['refresh_token'] #refresh the access token when it expires
    request.session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']  #only lasts for one day, now you can see when it expires

#checking if access token has expired, if it has, then we need to replace it

    return redirect('/toptracks')
  else:
    return JsonResponse({"error": "Failed Authorization"})

#route to top artists

def get_toptracks():
  #check for any errors and handle those cases now
  if 'access_token' not in request.session:
    return redirect(gettingLogin(request)) #redirect to the login page- should this be in views??
  if datetime.now().timestamp > request.session['expires_at']:
    return redirect('/refresh-token') #we need to write this endpoint at some point ?
  headers = {
    'Authorization': f"Bearer{request.session['access_token']}"
  }
  response = requests.get(api_base_URL + 'me/top/tracks', headers=headers)
  toptracks = response.json()
  return JsonResponse(toptracks)

#refreshing the token if its expired
#app.route equivalent? / refresh-token
def refresh_token():
  if 'refresh_token' not in request.session:
    return redirect(gettingLogin(request))
  if datetime.now().time() > request.session['expires_at']:
    req_body = {
      'grant_type': 'refresh_token',
      'refresh_token': request.session['refresh_token'],
      'client_id': client_ID,
      'client_secret': client_secret,
    }

    response = requests.post(token_URL, req_body)
    new_token_info = response.json()

    request.session['access_token'] = new_token_info['access_token']
    request.session['expires_at'] = datetime.now().timestamp() + new_token_info['expires_in']

    return redirect('/toptracks')

  #running the app ????
