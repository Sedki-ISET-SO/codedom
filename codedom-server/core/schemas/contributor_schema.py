from core.models.models import Role

from pydantic import BaseModel

class ContributorBase(BaseModel):
    pass

class ContributorCreate(ContributorBase):
    pass

class Contributor(ContributorBase):
    id: int
    user_id: int
    repository_id: int
    role: Role