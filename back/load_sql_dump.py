# Create a new file, e.g., load_sql_dump.py, in one of your Django app's management/commands directory
# For example, if your app is called 'myapp', the directory structure would be: myapp/management/commands/load_sql_dump.py

from django.core.management.base import BaseCommand
from django.db import connection
import os

class Command(BaseCommand):
    help = 'Load SQL dump file into the database'

    def add_arguments(self, parser):
        parser.add_argument('dump_file', type=str, help='Path to the SQL dump file')

    def handle(self, *args, **kwargs):
        dump_file = kwargs['dump_file']
        if not os.path.exists(dump_file):
            self.stdout.write(self.style.ERROR(f"Dump file '{dump_file}' does not exist"))
            return

        with connection.cursor() as cursor:
            with open(dump_file, 'r') as f:
                sql_statements = f.read().split(';')
                for sql in sql_statements:
                    if sql.strip():
                        cursor.execute(sql)
        self.stdout.write(self.style.SUCCESS("SQL dump file loaded successfully"))
