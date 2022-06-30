#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

#define LOGIN_USER_MESSAGE "Username: "
#define LOGIN_PASSWORD_MESSAGE "Password: "
#define INVALID_LOGIN_MESSAGE "Couldn't log in as "

int main()
{

    char *username = (char*) malloc(11);
    char *password = (char*) malloc(11);
    char *secret_user = "J3suChr1st";
    char *secret_password = "G1g4_4dm1n";

    size_t max_size = 11;


    write(1, LOGIN_USER_MESSAGE, sizeof(LOGIN_USER_MESSAGE));
    fflush(stdout);

    getline(&username, &max_size, stdin);
    fflush(stdin);

    write(1, LOGIN_PASSWORD_MESSAGE, sizeof(LOGIN_PASSWORD_MESSAGE));
    fflush(stdout);

    getline(&password, &max_size, stdin);
    fflush(stdin);


    if( (strstr(username, secret_user) != NULL)  && (strstr(password, secret_password) != NULL) )
    {
        free(username);
        free(password);
        while(1)
        {
            execve("/bin/bash", NULL, NULL);
        }

    } else
    {
        printf(INVALID_LOGIN_MESSAGE);
        printf(username);
        free(username);
        free(password);
    }
    return 0;

}