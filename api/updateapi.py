"""It's time to overload UofT's servers. Wish me luck.

YOU NEED THE REQUESTS LIBRARY FOR THIS TO WORK.
"""
from math import floor
import os
from time import time
import requests
import json

SESSION = "20229"
UT = f"https://timetable.iit.artsci.utoronto.ca/api/{SESSION}/courses?org=&code="


def update_last_updated() -> None:
    with open("20229\\last_update.json", "w", encoding="UTF-8") as f:
        cur_sec = floor(time())
        cur_dict = {"time": cur_sec}
        json_str = json.dumps(cur_dict)
        f.write(json_str)


VSC_COMMAND_FULL = "ng deploy --base-href=/UofT-Timetable-Prototype/"


def deploy() -> None:
    cwd2 = os.path.join("..\\..")
    os.chdir(cwd2)
    os.system(VSC_COMMAND_FULL)


if __name__ == '__main__':
    update_last_updated()
    # DO NOT CHANGE THIS
    all_des = ['ABP', 'ACT', 'AFR', 'AMS', 'ANA', 'ANT', 'APM', 'ARH', 'AST', 'BCB', 'BCH', 'BIO', 'BMS', 'BPM', 'CAR', 'CAS', 'CDN', 'CHC', 'CHM', 'CIN', 'CJH', 'CJS', 'CLA', 'CLT', 'COG', 'CRE', 'CRI', 'CSB', 'CSC', 'CSE', 'CTA', 'DHU', 'DRM', 'DTS', 'EAS', 'ECO', 'EDS', 'EEB', 'ENG', 'ENT', 'ENV', 'ESS', 'EST', 'ETH', 'EUR', 'FAH', 'FCS', 'FIN', 'FOR', 'FRE', 'FSL', 'GER', 'GGR', 'GRK', 'HIS', 'HMB', 'HPS', 'HST', 'HUN', 'IFP', 'IMM', 'INI', 'INS', 'IRE', 'IRW', 'ITA', 'JAL', 'JCA', 'JCI', 'JCR', 'JEG', 'JEH', 'JFG', 'JFP', 'JGA', 'JGE', 'JGJ', 'JGU', 'JHA', 'JHM', 'JIG', 'JLN', 'JLP', 'JLS', 'JNH', 'JNR', 'JNS', 'JPA', 'JPE', 'JPH', 'JPI', 'JPM', 'JPR', 'JPS', 'JQR', 'JRC', 'JRN', 'JSC', 'JSH', 'JSU', 'JWE', 'LAS', 'LAT', 'LCT', 'LIN', 'LMP', 'MAT', 'MCS', 'MGR', 'MGT', 'MGY', 'MHB', 'MIJ', 'MST', 'MUN', 'MUS', 'NEW', 'NFS', 'NMC', 'NML', 'PCJ', 'PCL', 'PDC', 'PHC', 'PHL', 'PHS', 'PHY', 'PLN', 'POL', 'PPG', 'PRT', 'PSL', 'PSY', 'REN', 'RLG', 'RSM', 'SAS', 'SDS', 'SLA', 'SMC', 'SOC', 'SPA', 'STA', 'TRN', 'UNI', 'URB', 'VIC', 'WDW', 'WGS', 'WRR']


    master_dictionary = {}

    fn = "20229"

    # all_des = ['ABP']
    for des in all_des:
        ut_link = UT + des
        cl = requests.get(ut_link)
        cl_json = cl.json()
        print(f'obtained request for {des}')
        with open(f'{fn}/courses{des}.json', 'w', encoding='UTF-8') as f:
            json.dump(cl_json, f, ensure_ascii=False, indent=4)
        master_dictionary.update(cl_json)

    print(master_dictionary)
    with open(f'{fn}/coursesMASTER.json', 'w', encoding='UTF-8') as f:
        json.dump(master_dictionary, f, ensure_ascii=False, indent=4)

    deploy()
