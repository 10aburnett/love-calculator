#!/usr/bin/env python3

"""
Google Search Console Bulk Indexing Request Script
Run this to request indexing for all your sitemap URLs at once
"""

import requests
import xml.etree.ElementTree as ET
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import time

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/webmasters']

def get_urls_from_sitemap(sitemap_url):
    """Extract all URLs from sitemap"""
    response = requests.get(sitemap_url)
    root = ET.fromstring(response.content)
    
    # Handle namespace
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = []
    
    for url in root.findall('ns:url', namespace):
        loc = url.find('ns:loc', namespace)
        if loc is not None:
            urls.append(loc.text)
    
    return urls

def authenticate_gsc():
    """Authenticate with Google Search Console API"""
    creds = None
    
    # Check if token.json exists
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    # If there are no valid credentials, let the user log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # You need to download credentials.json from Google Cloud Console
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save credentials for next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    return build('searchconsole', 'v1', credentials=creds)

def request_indexing(service, urls):
    """Request indexing for list of URLs"""
    print(f"Requesting indexing for {len(urls)} URLs...")
    
    success_count = 0
    failed_count = 0
    
    for i, url in enumerate(urls):
        try:
            # Request indexing
            request = {
                'url': url,
                'type': 'URL_UPDATED'
            }
            
            service.urlNotifications().publish(body=request).execute()
            print(f"✅ {i+1}/{len(urls)}: {url}")
            success_count += 1
            
            # Rate limiting - Google allows 200 requests per day
            time.sleep(0.5)  # Wait 0.5 seconds between requests
            
        except Exception as e:
            print(f"❌ {i+1}/{len(urls)}: {url} - Error: {str(e)}")
            failed_count += 1
            
        # Take a longer break every 50 requests
        if (i + 1) % 50 == 0:
            print(f"Processed {i+1} URLs, taking a 10-second break...")
            time.sleep(10)
    
    print(f"\n📊 Summary:")
    print(f"✅ Successfully requested: {success_count}")
    print(f"❌ Failed: {failed_count}")
    print(f"📝 Total URLs: {len(urls)}")

def main():
    sitemap_url = "https://lovecalcs.com/sitemap.xml"
    
    print("🔍 Fetching URLs from sitemap...")
    urls = get_urls_from_sitemap(sitemap_url)
    print(f"Found {len(urls)} URLs in sitemap")
    
    print("\n🔐 Authenticating with Google Search Console...")
    service = authenticate_gsc()
    
    print("\n📤 Starting bulk indexing requests...")
    request_indexing(service, urls)
    
    print("\n🎉 Bulk indexing request completed!")
    print("Note: It may take Google several days to actually crawl and index the pages.")

if __name__ == "__main__":
    import os
    main() 