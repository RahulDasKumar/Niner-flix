::Removes storeRecrods.db if it exists
if exist storeRecords.db (
    DEL storeRecords.db
)

..\sqlite3\sqlite3.exe storeRecords.db < schema.sql
..\sqlite3\sqlite3 storeRecords.db < startingData.sql