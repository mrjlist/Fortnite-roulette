import fortnite_api
import json

api = fortnite_api.FortniteAPI()

qwer = api.cosmetics.fetch_all()
# for i in qwer.raw_data["featured"]["entries"]:
#     print(i["items"][0]["images"]["smallIcon"])
# print(qwer)
f = open("rr.json", "a")
for i in qwer:
    f.write(json.dumps(i.raw_data))