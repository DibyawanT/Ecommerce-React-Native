import {Account, Client, Databases,Storage} from 'appwrite';
import Config from 'react-native-config';

export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65814e343e200aa70e6a');

export const account = new Account(client);

export const database = new Databases(client);

export const storage = new Storage(client);

