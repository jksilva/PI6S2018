#!C:\Users\JacksondaCostaSilva\Desktop\pi6s2018\PI6S2018\CodeGen_1_0\CodeGen_1_0\src\venv\Scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'pip==10.0.1','console_scripts','pip3.5'
__requires__ = 'pip==10.0.1'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('pip==10.0.1', 'console_scripts', 'pip3.5')()
    )
