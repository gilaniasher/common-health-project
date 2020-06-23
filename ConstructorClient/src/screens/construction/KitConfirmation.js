import React from 'react';
import { WebView } from 'react-native-webview';

export default function KitConfirmation() {
    return (
        <WebView 
            source={{ 
                uri: 'https://docs.google.com/forms/d/e/1FAIpQLSe7nb3sncAcumy5pZoD9d0qE0AThJlsYF-MVY-laZV1Z4UX8g/viewform'
            }}
        />
    );
}
