from typing import List, Type
from core.schemas.file_schema import File

from pydantic import BaseModel

class IssueBase(BaseModel):
    name: str
    description: str
    created_at: str
    type: Type

class IssueCreate(IssueBase):
    pass

class Issue(IssueBase):
    id: int
    is_resolved: bool
    issuer_id: int
    repository_id: int
    related_files: List[File] = []