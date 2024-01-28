#!/bin/bash

# This script is used for managing the database for Legal Mate.
# It includes functions for initializing, backing up, and restoring the database.

# Load configuration
source deployment/config.sh

# Function to initialize the database
initialize_database() {
    echo "Initializing the Legal Mate database..."
    # Command to create the database schema
    mongo $DB_NAME --eval "db.createCollection('cases'); db.createCollection('documents'); db.createCollection('clients'); db.createCollection('users'); db.createCollection('invoices');"
    echo "Database initialized successfully."
}

# Function to backup the database
backup_database() {
    echo "Backing up the Legal Mate database..."
    # Command to dump the database to a file
    mongodump --db $DB_NAME --out $BACKUP_PATH/$(date +%F)
    echo "Database backup completed."
}

# Function to restore the database from a backup
restore_database() {
    echo "Restoring the Legal Mate database from backup..."
    # Command to restore the database from the most recent backup file
    mongorestore --db $DB_NAME $BACKUP_PATH/$1
    echo "Database restored successfully."
}

# Check the passed argument and call the respective function
case $1 in
    init)
        initialize_database
        ;;
    backup)
        backup_database
        ;;
    restore)
        if [ -z "$2" ]; then
            echo "Please provide the date of the backup to restore (format: YYYY-MM-DD)."
            exit 1
        fi
        restore_database $2
        ;;
    *)
        echo "Invalid command. Usage: $0 {init|backup|restore <date>}"
        exit 1
        ;;
esac