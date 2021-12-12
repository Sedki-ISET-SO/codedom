from typing import List
from core.models.models import Language
from core.schemas.issue_schema import Issue

from pydantic import BaseModel

class FileBase(BaseModel):
    name: str
    created_at: str

class FileCreate(FileBase):
    pass

class File(FileBase):
    id: int
    size: float
    language: Language
    repository_id: int
    commit_id: int
    related_issues: List[Issue] = []