## Todos:

1. Fix grid behaviour on error
2. Handle errors globally.
3. Write README
4. Archive page filters
5. Image details -> requsted image skeleton

# Homepage

In the homepage the user is able to track what pictures are uploaded on the server. Once the picture is uploaded, the server will dispatch an event containing that picture.

# Archive

The `Homepage` screen is great to follow the live stream of pictures, but I think we need a place to explore "old" pictures as well. This is why I added this page. Here, the user can see all the pictures uploaded in certain day. He can filter the content by day.

# Image details

The user can click on any picture (in both `Homepage` & `Archive` screens) and he will be redirected to the `Image details` screen. Here he can see the picture alongside other details (maybe that meta information at some point).
Besides this he can request the picture in different sizes (as requested in the brief). Here I added the option to display the request size of the picture either in the same page (rendered below) or in a new tab. This option can be selected via the switch component.

# Real time solution

In the brief I received there was mention of "real time / close to real time". In order to achieve this behaviour I chose to use `Server Sent Events` since they are natively supported by all browsers (expect IE). SSE approach is very useful when the client is **not required** to comuniate with the server as well. In this particular case, since the client has to display all the pictures in real time from the server, I decided to go with this approach.

Alternatives out there:

1. Websockets
2. A request each couple of milliseconds / seconds to check for the new content.

# Frontend

This kind of request where we need to display large amount of data can end up in a huge performance issue. I tackled this problem by using virtualization. Both grids use this approach but in a slitghly different way.

-   On the `Homepage` page the grid gets updated every time a new event is received. The new image is pushd in the front of the array (to make sure the latest uploaded photo is the first to be seen by the user). (pure virtualization)
-   On the `Archive` page the grids gets updated once you start scrolling. (infinite scroll)

# Backend

Processing images is a CPU consuming task so the way I see the backend organised is like this:

-   Core API
-   Independent service to process images
