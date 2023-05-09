"""adds authentication

Revision ID: 1bb337a940b1
Revises: 8b011ba874cf
Create Date: 2023-05-09 11:53:26.327656

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1bb337a940b1'
down_revision = '8b011ba874cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password__hash', sa.String(), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('_password__hash')

    # ### end Alembic commands ###
