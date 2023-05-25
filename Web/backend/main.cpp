#include <iostream>
#include <mysql/mysql.h>

int main()
{
    MYSQL mysql_conn;
    MYSQL *mysql = mysql_init(&mysql_conn);
    if (mysql == NULL){
        printf("mysql init err\n");
        exit(1);
    }

    if (mysql_real_connect(mysql, "host", "usr", "passwd", "MMProj", 3306, NULL, 0) == NULL){
        printf("connect err\n");
        exit(1);
    }
    printf("connection setups\n");

    mysql_close(mysql);
    exit(0);
}