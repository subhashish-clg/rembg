from typing import Union

from fastapi import FastAPI

# Routes
from routes.remove import remove_router

app = FastAPI()


@app.get("/")
def read_root():
    return {
        "version": "v0.0.1",
        "name": "Remove BG Server"
    }


app.include_router(remove_router, prefix="/remove")
