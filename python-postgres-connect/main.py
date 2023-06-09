import psycopg2
from config import host, user, password, db_name

try:
    connection = psycopg2.connect(
        host=host,
        user=user,
        password=password,
        database=db_name
    )
    connection.autocommit = True

#    with connection.cursor() as cursor:
#        cursor.execute(
#            "SELECT version();"
#        )
#
#        print(f"Server version: {cursor.fetchone()}")

#    with connection.cursor() as cursor:
#        cursor.execute(
#            """
#            CREATE TABLE users(
#                id          serial      PRIMARY KEY,
#                first_name  varchar(50) NOT NULL,
#                second_name varchar(50) NOT NULL
#            );
#            """
#        )
#        print("Table was successfully created")

#    with connection.cursor() as cursor:
#        cursor.execute(
#            """
#            INSERT INTO users(
#                first_name,
#                second_name
#            ) VALUES (
#                'Maxim', 'Savincev'
#            );
#            """
#        )
#        print("Data was successfully inserted")

    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT * FROM product1;
            """
        )
        print(cursor.fetchone())

except Exception as _ex:
    print("Error accured while working with PostgreSQL", _ex)
finally:
    if connection:
        connection.close()
        print("PostgreSQL connection closed")
