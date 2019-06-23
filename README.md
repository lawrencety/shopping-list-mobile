## Simplist Mobile app
Simplist is a simple shared list app for users who want to share and keep track of simple checklists such as shopping lists or tasks.

### Current build
This version of Simplist mobile platform is built on React Native. The mobile platform uses both AJAX calls for 'get' and 'post' requests and uses WebSockets (Socket.io) for synchronization of updates between open instances of the app. In future versions, AJAX calls can be removed entirely and communications with the API can be done through WebSockets.

### Stack
-React Native: Mobile development framework
-Socket.io Client: Websocket library for client side
-Expo: Packager

### Functionality
* List
  1. List creation
  2. List read
  3. List update
  4. List deletion

* Item
  1. Item creation
  2. Item read
  3. Item update
  4. Item deletion
  5. Update purchase (complete) status
