#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

#define MAX_NAME_SIZE 16
#define MAX_COMPANY_SIZE 5

typedef struct employee {
    char * name;
    void (*greet)(char *name);
} employee;

void print_name(char *name)
{
    printf("Name: %s\n", name);
}

void print_menu(void)
{
    printf("Choose an option:\n"
        "1: Manage server\n"
        "2: Hire new employee\n"
        "3: Fire employee\n"
        "4: List employees\n"
    );
}

employee* create_employee()
{
    employee *emp = malloc(sizeof(employee));
    char *emp_name = malloc(MAX_NAME_SIZE * sizeof(char)); 
    printf("Name of the employee: \n");
    getchar(); // Consume newline from buffer
    gets(emp_name);
    emp->name = emp_name;
    emp->greet = &print_name;

    return emp;
}

void manage_server(char *cmd)
{
    setuid(0);
    system(cmd);
}

int hire_employee(employee **company)
{
    for(int i=0; i < MAX_COMPANY_SIZE; i++)
    {
        if(company[i] == NULL)
        {
            company[i] = create_employee();
            return 0;
        }
    }
    printf("No more space\n");
    return -1;
}

int fire_employee(employee **company)
{
    char name[MAX_NAME_SIZE] = {0};
    printf("Give the name of the employee\n");
    getchar(); // Consume newline from buffer
    fgets(name, MAX_NAME_SIZE, stdin);
    for(int i=0; i < MAX_COMPANY_SIZE; i++)
    {
        if( (company[i] != NULL ) && (strstr(name, company[i]->name) ) )
        {
            printf("Firing %s", name);
            free(company[i]->name);
            free(company[i]);
            return 0;
        }
    }
    return -1;
}

void list_employees(employee **company)
{
    printf("Listing current employees\n");
    for(int i=0; i < MAX_COMPANY_SIZE; i++)
    {
        if(company[i])
        {
            company[i]->greet(company[i]->name);

        }
    }
}

int main(int argc, char **argv)
{
    int option = -1;

    employee **company = malloc(MAX_COMPANY_SIZE * sizeof(employee));

    employee *manager = malloc(sizeof(employee));

    char *manager_name = malloc(MAX_NAME_SIZE * sizeof(char)); 
    printf("What is your name: \n");
    gets(manager_name);
    manager->name = manager_name;
    manager->greet = &print_name;

    company[0] = manager;

    printf(manager->name);

    while(1)
    {
        print_menu();
        scanf("%d", &option);

        switch(option){
            case 1:
                printf("You wish you were the sysadmin,huh?");
                option = -1;
                break;
            case 2:
                hire_employee(company);
                option = -1;
                break;
            case 3:
                fire_employee(company);
                option = -1;
                break;
            case 4:
                list_employees(company);
                option = -1;
                break;
            default:
                printf("Invalid option (%d)\n", option);
                option = -1;
        }

    }

    return 0;
}