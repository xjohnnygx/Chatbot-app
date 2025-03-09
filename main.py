import uvicorn
from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routers.chat import router


app = FastAPI()

# CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    path="/static",
    app=StaticFiles(
        directory="static"
    )
)

app.include_router( router )


@app.get("/")
async def serve_index( request: Request ) -> Response:
    with open("templates/index.html", "rt", encoding="utf-8") as file:
        index = file.read()
        return Response(
            content=index,
            status_code=200,
            headers={"Content-Type": "text/html"}
        )


if __name__ == '__main__':
    uvicorn.run(
        app=app,
        host="0.0.0.0",
        port=8000
    )