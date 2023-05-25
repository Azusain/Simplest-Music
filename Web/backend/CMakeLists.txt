cmake_minimum_required(VERSION 3.0.0)
project(Simplest-Music VERSION 0.1.0)

include_directories(/usr/include/mysql)
link_directories(/usr/lib64/mysql)

add_executable(Simplest-Music main.cpp)

target_link_libraries(Simplest-Music
    mysqlclient
)