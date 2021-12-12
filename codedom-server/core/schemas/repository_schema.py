from typing import List, Optional
from core.schemas.user_schema import User
from core.schemas.commit_schema import Commit
from core.schemas.file_schema import File
from core.schemas.issue_schema import Issue

from pydantic import BaseModel

class RepositoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_visible: bool

class RepositoryCreate(RepositoryBase):
    pass


class Repository(RepositoryBase):
    id: int
    repository_temporary_link: str
    repository_size: float
    downloads_number: int
    related_users: List[User] = []
    commits: List[Commit] = []
    files: List[File] = []
    issues: List[Issue] = []

    class Config:
        orm_mode = True