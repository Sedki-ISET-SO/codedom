from typing import List
from core.schemas.file_schema import File

from pydantic import BaseModel

class CommitBase(BaseModel):
    message: str
    created_at: str

class CommitCreate(CommitBase):
    pass


class Commit(CommitBase):
    id: int
    author_id: int
    repository_id: int
    committed_files: List[File] = []

    class Config:
        orm_mode = True