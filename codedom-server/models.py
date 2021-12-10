from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from enum import Enum

from sqlalchemy.sql.schema import Table

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    tokens = Column(Integer, default=0, nullable=True)

    repositories = relationship("Repository", back_populates="owner")
    commits = relationship("Commit", back_populates="author")
    issues = relationship("Issues", back_populates="issuer")

class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, default='', nullable=True)
    is_visible = Column(Boolean)
    repository_temporary_link = Column(String, default='', nullable=True)
    repository_size = Column(Float, default=0.0)
    downloads_number = Column(String)

    contributors = relationship("Contributor", back_populates="repository")
    commits = relationship("Commit", back_populates="repository")
    files = relationship("File", back_populates="repository")
    issues = relationship("Issue", back_populates="repository")


class Role(str, Enum):
    owner = "owner"
    maintainer = "maintainer"
    contributor = "contributor"


class Contributor(Base):
    __tablename__ = "contributors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), primary_key=True)

    role = Role


class Commit(Base):
    __tablename__ = "commits"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    created_at = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))
    repository_id = Column(Integer, ForeignKey("repositories.id"))
    committed_files = relationship("File", back_populates="commit")


issues_files = Table("issues_files", Base.metadata,
                     Column("issue_id", ForeignKey(
                         "issue.id"), primary_key=True),
                     Column("file_id", ForeignKey("file.id"), primary_key=True))


class Language(str, Enum):
    javascript = "js"
    typescript = "ts"
    python = "py"
    java = "java"
    cpp = "cpp"
    c = "c"
    php = "php"
    html = "html"
    css = "css"
    sql = "sql"
    shell = "sh"
    json = "json"
    lock = "lock"
    yaml = "yaml"


class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    size = Column(Float)
    created_at = Column(String)
    language = Language

    repository_id = Column(Integer, ForeignKey("repositories.id"))
    commit_id = Column(Integer, ForeignKey("commits.id"))
    related_issues = relationship("Issue",
                            secondary=issues_files,
                            back_populates="related_files")

class Type(str, Enum):
    enhancement = "enhancement"
    feature = "feature"
    bug = "bug"
    help_wanted = "help wanted"
    suggestion = "suggestion"


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    created_at = Column(String)
    is_resolved = Column(Boolean, default=False)
    type = Type

    user_id = Column(Integer, ForeignKey("users.id"))
    repository_id = Column(Integer, ForeignKey("repositories.id"))
    related_files = relationship("Files",
                        secondary=issues_files,
                        back_populates="related_issues")
