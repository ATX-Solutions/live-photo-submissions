## Todos:

1. Fix grid behaviour on error
2. Handle errors globally (snackbar).
3. Write README
4. Archive page filters

# Screens

## Homepage

In the homepage the user is able to track what pictures are uploaded on the server. Once the picture is uploaded, the server will dispatch an event containing that picture.

## Archive

The `Homepage` screen is great to follow the live stream of pictures, but I think we need a place to explore "old" pictures as well. This is why I added this page. Here, the user can see all the pictures uploaded in certain day. He can filter the content by day.

## Image details

The user can click on any picture (in both `Homepage` & `Archive` screens) and he will be redirected to the `Image details` screen. Here he can see the picture alongside other details (maybe that meta information at some point).
Besides this he can request the picture in different sizes (as requested in the brief). Here I added the option to display the request size of the picture either in the same page (rendered below) or in a new tab. This option can be selected via the switch component.

# Real time solution

In the brief I received there was mention of "real time / close to real time". In order to achieve this behaviour I chose to use `Server Sent Events` since they are natively supported by all browsers (expect IE). SSE approach is very useful when the client is **not required** to comuniate with the server as well. In this particular case, since the client has to display all the pictures in real time from the server, I decided to go with this approach.

Alternatives out there:

1. Websockets
2. A request each couple of milliseconds / seconds to check for the new content.

# Frontend

When we need to display large amount of data we end up with a huge performance issue. I tackled this problem by using virtualization. Both grids use this approach but in a slitghly different way.

-   On the `Homepage` page the grid gets updated every time a new event is received. The new image is pushd in the front of the array (to make sure the latest uploaded photo is the first to be seen by the user).
-   On the `Archive` page the grids gets updated once you start scrolling. (infinite scroll)

### Error handling

In order to handle API errors, I created an interceptor and based on the status it decides what to do. This can be improved of course, but given the details I received this was everything I had in mind.

-   `404` => redirect to 404 page in the app
-   `500` => Snackbar is displayed

# Backend

Processing images is a CPU consuming task so the way I see the backend organised is like this:

-   Core API (endpoints):
    -   `/sse` => the SSE connection (`ImageResponse` interface)
    -   `/photos/:id` GET => return the photo details (`ImageResponse` interface)
    -   `/photos/:id?w=500&h=300` GET => return the photo details (`ImageResponse` interface) with `src.custom` property populated with the custom request.
    -   rest of the CRUD operations if needed?
-   Independent service to process images
    -   When the core endpoint `/photos/:id?w=500&h=300` is called, the core API will call this service to get the image processed.
-   The response should contain an URL of the photo. The photos should be served from a CDN.

The `Core API` app should dispatch an event every time a new photo is uploaded.

The core should expose an endpoint such `/photos/:id` that accepts query params to edit the image accordingly.

-   `?w=VALUE` width
-   `?h=VALUE` height
-   even more options can be passed depending on the use case (example: aspect ratio enabled/disabled)
