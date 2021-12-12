from typing import List
from core.schemas.contributor_schema import Contributor
from core.schemas.commit_schema import Commit
from core.schemas.issue_schema import Issue

from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    hashed_password: str


class User(UserBase):
    id: int
    is_active: bool
    total_tokens: int
    related_repositories: List[Contributor] = []
    commits: List[Commit] = []
    issues: List[Issue] = []

    class Config:
        orm_mode = True