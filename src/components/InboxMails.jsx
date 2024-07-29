import React, { useState, useEffect } from 'react';

const apikey = import.meta.env.API;

const CLIENT_ID = '1040445712691-cg37veqkc9uqa3qbtjpuc26jp0shoatm.apps.googleusercontent.com';
const API_KEY = apikey;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

function InboxMails() {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [tokenClient, setTokenClient] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeGapiClient = async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      setGapiLoaded(true);
    };

    const initializeGisClient = () => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        // callback: '',
      });
      setTokenClient(client);
      setGisLoaded(true);
    };


    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.onload = () => gapi.load('client', initializeGapiClient);
    document.body.appendChild(script1);

    
    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.onload = initializeGisClient;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    if (gapiLoaded && gisLoaded) {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        gapi.client.setToken({ access_token: storedToken });
        setIsAuthorized(true);
        listMessages();
      }
    }
  }, [gapiLoaded, gisLoaded]);

  const handleAuthClick = () => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        console.error('Auth Error:', resp);
        throw resp;
      }
      console.log('Auth Response:', resp);
      setIsAuthorized(true);
      localStorage.setItem('access_token', resp.access_token);
      await listMessages();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  const listMessages = async () => {
    setLoading(true);
    try {
      const token = gapi.client.getToken();
      console.log('Current Token:', token);
      const response = await gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: 10,
        q: 'is:inbox -from:me',
      });

      const messages = response.result.messages || [];
      console.log('Messages Response:', response);
      const messageDetails = await Promise.all(
        messages.map(async (message) => {
          const msg = await gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: message.id,
          });
          const headers = msg.result.payload.headers;
          const fromHeader = headers.find((header) => header.name === 'From');
          const subjectHeader = headers.find((header) => header.name === 'Subject');
          const body = msg.result.snippet; 
          return {
            id: message.id,
            from: fromHeader ? fromHeader.value : 'Unknown Sender',
            subject: subjectHeader ? subjectHeader.value : 'No Subject',
            body: body ? body : 'No Content',
          };
        })
      );
      setMessages(messageDetails);
    } catch (err) {
      console.error('List Messages Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const viewMail = async (id) => {
    setLoading(true);
    try {
      const response = await gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: id,
      });

      const msg = response.result;
      const headers = msg.payload.headers;
      const fromHeader = headers.find((header) => header.name === 'From');
      const subjectHeader = headers.find((header) => header.name === 'Subject');
      const body = msg.snippet; 

      setSelectedEmail({
        id: id,
        from: fromHeader ? fromHeader.value : 'Unknown Sender',
        subject: subjectHeader ? subjectHeader.value : 'No Subject',
        body: body ? body : 'No Content',
      });
    } catch (err) {
      console.error('Error fetching email:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Inbox</h2>
      {!isAuthorized ? (
        <button className="bg-blue-500 mt-5 hover:bg-blue-700" id="authorize_button" onClick={handleAuthClick}>Authorizing</button>
      ) : (
        <>
          {selectedEmail ? (
            <div className='bg-gray-200 mt-2 border-y-2 border-gray-900'>
              <div className='m-2'>
                <h3 className='font-semibold'>{selectedEmail.subject}</h3>
              </div>
              <div className='flex mb-2 ml-1'>
                <p><strong>From:</strong> {selectedEmail.from}</p>
              </div>
              <div className='flex ml-1'>
                <strong>Message</strong>
              </div>
              <div className='flex text-left ml-1 mr-1'>{selectedEmail.body}</div>
              <div className='flex justify-end'>
                <button className='bg-red-500 text-white m-2 mt-8 hover:bg-red-700 hover:border-2 border-black' onClick={() => setSelectedEmail(null)}>Back to Inbox</button>
              </div>
            </div>
          ) : (
            <div>
              {loading ? (
                <div>Loading...</div>
              ) : messages.length > 0 ? (
                messages.map((msg, index) => (
                  <button key={index} className='flex-1 w-full' onClick={() => viewMail(msg.id)}>
                    <div className="email-card bg-gray-200 mb-1">
                      <div className='flex justify-start'>
                        <p><strong>From:</strong> {msg.from}</p>
                      </div>
                      <div className='flex'>
                        <p><strong>Subject:</strong> {msg.subject}</p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div>No messages found.</div>
              )}
              <button className="bg-blue-500 mt-5 hover:bg-blue-700" onClick={listMessages}>Refresh</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InboxMails;
