# Screens

## Homepage - `/`

In the homepage the user is able to track what images are uploaded on the server. Once the image is uploaded, the server will dispatch an event containing that image (`ImageResponse` interface).

## Archive - `/archive`

The `Homepage` screen is great to follow the live stream of images, but I think we need a place to explore "old" images as well. This is why I added this page. Here, the user can see all the images uploaded in certain day. He can filter the content by day.

## Image details - `/images/:id`

In the brief I received there was this mention `An image will have an asset id associated with it.`. Based on the mocks I have, I decided to use the `id` property of the image to create that link, but it can be easily replaced by the asset id.

The user can click on any image (in both `Homepage` & `Archive` screens) and he will be redirected to the `Image details` screen. Here he can see the image alongside other details (maybe that meta information at some point).
Besides this he can request the image in different sizes (as requested in the brief). Here I added the option to display the request size of the image either in the same page (rendered below) or in a new tab. This option can be selected via the switch component.

# Real time solution

In the brief I received there was mention of "real time / close to real time". In order to achieve this behaviour I chose to use `Server Sent Events` since they are natively supported by all browsers (expect IE). SSE approach is very useful when the client is **not required** to comuniate with the server as well. In this particular case, since the client has to display all the images in real time from the server, I decided to go with this approach.

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
    -   `/sse` => the SSE connection (`ImageResponse` interface); every time a new photo is uploaded this service should dispatch an event.
    -   `/photos/:id` GET => return the photo details (`ImageResponse` interface)
    -   `/photos/:id?w=500&h=300` GET => return the photo details (`ImageResponse` interface) with `src.custom` property populated with the custom request.
    -   rest of the CRUD operations if needed?
-   Independent service to process images
    -   When the core endpoint `/photos/:id?w=500&h=300` is called, the core API will call this service to get the image processed.
-   The response should contain an URL of the photo. The photos should be served from a CDN.

The core should expose an endpoint such `/photos/:id` that accepts query params to edit the image accordingly.

-   `?w=VALUE` width
-   `?h=VALUE` height
-   even more options can be passed depending on the use case (example: aspect ratio enabled/disabled)

# Mocks

I used the https://www.pexels.com/ API to store locally 80 images. https://github.com/ATX-Solutions/photos

In order to show the SSE approach I created a repo with the SSE implementation in php. https://github.com/ATX-Solutions/photos-sse

The SSE implementation is quite simple. It randomnly selects an image from those 80 images. Once in a 10 events, it also sends an error response (`APIError` interface).

There is also a function defined in the frontend repo `mockFetch` to mock a request to the `Core API`. Since the pexels API provided the `/photo/:id` endpoint I decided to use that one instead of a mocked endpoint in order save some time. The `mockFetch` function is used only for the endpoint `/photo/:id?w=VALUE`.

# Deployment

No application is fun without this part. Both the frontend and the SSE are deployed using heroku.

https://live-photo-submissions-app.herokuapp.com/

# Final notes

The brief mentioned something about the application being used "remote". My assumption was that the application will be used on mobile devices as well. The application is usable on mobile devices as well, but there is room for improvements.
