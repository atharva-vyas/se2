import json
import time
import random
from datetime import datetime, timedelta

def random_time_in_day(date):
    random_seconds = random.randint(0, 86399)  # 86399 is the number of seconds in a day minus 1
    return date + timedelta(seconds=random_seconds)

tempArr = []
def main():
    start_epoch = 1699654639
    end_epoch = 1731277039

    current_date = datetime.fromtimestamp(start_epoch).replace(hour=0, minute=0, second=0, microsecond=0)
    end_date = datetime.fromtimestamp(end_epoch).replace(hour=23, minute=59, second=59, microsecond=999999)

    while current_date <= end_date:
        
        maxHours_perDay = 7
        inbetween = [0, 5]
        print("==========================================================")
        print("==========================================================")
        print("==========================================================")
        print(f"Date: {current_date.date()}")

        for i in range(maxHours_perDay):
            random_datetime = random_time_in_day(current_date)
            epoch_time = int(random_datetime.timestamp())
            value = random.randint(inbetween[0], inbetween[1])

            if value > 0:
                # print(random_datetime)
                # print({"value": value,"epoch": epoch_time})
                tempArr.append({"value": value,"epoch": epoch_time})

        current_date += timedelta(days=1)


    with open('output.json', 'w') as file:
        json.dump(tempArr, file)
        file.write('\n')

    print("Data has been written to output.json")

if __name__ == "__main__":
    main()
