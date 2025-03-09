import json
import requests
from schemes import Message
from security import variables
from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.responses import Response


router = APIRouter()

@router.post("/chat")
async def chat( request: Request ) -> Response:
    try:
        body = await request.json()
        message = Message(**body)

        url = "https://api.openai.com/v1/chat/completions"

        data = json.dumps({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": message.message}]
        })

        headers = {
            "Authorization": f"Bearer { variables["API_KEY"] }",
            "Content-Type": "application/json"
        }

        response = requests.post(url=url, data=data, headers=headers)
        data = response.json()
        if response.status_code == 200:
            return Response(
                content=json.dumps({"response": data["choices"][0]["message"]["content"]}),
                status_code=200,
                headers={"Content-Type": "application/json"}
            )
        return Response(
            content=json.dumps( data ),
            status_code=response.status_code,
            headers={"Content-Type": "application/json"}
        )
    except Exception as error:
        print("here")
        return Response(
            content=json.dumps({"error": str(error)}),
            status_code=500,
            headers={"Content-Type": "application/json"}
        )