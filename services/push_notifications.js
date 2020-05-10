import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// Using test server from course 
const PUSH_ENDPOINT = 'http://YOUR_SERVER/api/tokens'

export default async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = Permissions.askAsync(Permissions.NOTIFICATIONS);
        return;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to acquire push token');
        return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Token: ', token);
    
    // Store the token in your server
}