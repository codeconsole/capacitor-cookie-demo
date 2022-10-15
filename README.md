# Cookies No Longer Work in Capactor 4

The following application demonstrates how cookies work in Capacitor 3, but not in Capacitor 4.

I believe this [question](https://stackoverflow.com/questions/73944676/set-cookie-header-not-set-for-capacitor-4-android) might be a similiar issue.  [Here is another reported cookie issue, but not sure if related.](https://forum.ionicframework.com/t/cookies-blocked-after-capacitor-4-upgrade/225625/)

The setup (the following is done by running `./scripts/setup.sh`:
```
npm install
npx webpack
cd cap3
npm install
cd ..
cd cap4 
npm install
cd ..
```

The tricky part in demonstrating the issue is setting up an https server. You will need to provide a certificate and a private key `fullchain.pem` `privkey.pem` in the cert folder (for your domain, for example: dev.example.com).

Then you will need to add a host entry to the emulator so that it points to your local server.
```
./scripts/startWriteableEmulator.sh
```
to update the hosts file of the emulator, then:
```
./scripts/addHost.sh dev.example.com
```
to point dev.example.com to your local server.

Once that is done, you can start the local server:
```
npm run server
```
The server will attempt to set a cookie every time and will log the cookie value in brackets [] if it is successfully sent back.


Then to view the Capacitor 3 version:
```
npm run cap3
```

Then to view the Capacitor 4 version:
```
npm run cap3
```

References:

https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/#why-https-locally

https://stackoverflow.com/questions/41117715/how-to-edit-etc-hosts-file-in-android-studio-emulator-running-in-nougat

https://developer.android.com/studio/run/emulator-networking.html

The following will not work because the emulator will not have the CA.
https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/#why-https-locally
https://web.dev/how-to-use-local-https/
```
brew install mkcert
mkcert -install
mkcert localhost
```

https://stackoverflow.com/questions/42554337/cannot-launch-avd-in-emulatorqt-library-not-found
"Qt library not found at"
export PATH=$ANDROID_HOME/emulator:$PATH