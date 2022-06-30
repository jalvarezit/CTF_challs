
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>

#define FLAG_SIZE 31

int main()
{
    setuid(0);

    FILE* ptr;
    char ch;

    char flag[31] = { 0 };

    ptr = fopen("/root/flag", "r");
 
    if (NULL == ptr) {
        printf("file can't be opened \n");
    }

    fgets(flag, FLAG_SIZE, ptr);

    printf("%s", flag);

    fclose(ptr);
    return 0;
}