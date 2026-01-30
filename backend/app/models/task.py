
from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.db.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)

    status = Column(String, default="pending")
    priority = Column(String, default="medium")
    due_date = Column(Date)

    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))

    assigned_to_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    project = relationship("Project", back_populates="tasks")

    assigned_to = relationship(
        "User",
        foreign_keys=[assigned_to_id],
        back_populates="assigned_tasks"
    )
   
    created_by = relationship(
        "User",
        foreign_keys=[created_by_id],
        back_populates="created_tasks"
    )



# class Task(Base):
#     __tablename__ = "tasks"

#     id = Column(Integer, primary_key=True, index=True)

#     title = Column(String, nullable=False)
#     description = Column(String)

#     status = Column(String, default="pending")  # pending | completed
#     priority = Column(String, default="medium")

#     due_date = Column(Date)

#     project_id = Column(Integer, ForeignKey("projects.id"))
#     assigned_to_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
#     created_by_id = Column(Integer, ForeignKey("users.id"),  nullable=False)

#     project = relationship("Project", back_populates="tasks")
#     # ✅ explicit relationships
#     assigned_to = relationship("User", foreign_keys=[assigned_to_id],back_populates="assigned_tasks")

#     created_by = relationship("User",foreign_keys=[created_by_id],back_populates="created_tasks")


