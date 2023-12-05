# checkin-app
Vue 3 app that uses geolocation API and periodic checkins to record actiity at a site. Live demo at https://checkin.shanehussel.net

## Motivation
In some localities animal control officers on a call are required to check in on a regular basis, usually by radio. If they do not check in on schedule, police will be dispatched to the site for their safety, which has a significant cost in resources. They have expressed interest in having a mobile app with which they can make their checkins more easily. This app is proof of concept and its first iteration.

## Use
When opened, the app first locates the user and displays their position on a map. To begin the tracking process the user clicks the checkin button with an optional message, or the message will be sent as "arrived". Then a timer will begin with a countdown to the next scheduled checkin. (For demo purposes the checkin interval is set to every 10 seconds.) After the checkin interval has elapsed, the checkin form will reappear and an alarm tone will sound until they submit a new checkin. The default checkin message for all subsequent checkins will be "OK" if no message is entered. In this demo, the process ends when the app is closed or the page is reloaded, at which point they can begin at a different site.
