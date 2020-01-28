import { Component, OnInit } from '@angular/core';
const continents = [
  {
    "continent": "Africa",
    "countries": [
      {
        "name": "Nigeria",
        "flag": "🇳🇬"
      },
      {
        "name": "Ethiopia",
        "flag": "🇪🇹"
      },
      {
        "name": "Egypt",
        "flag": "🇪🇬"
      },
      {
        "name": "DR Congo",
        "flag": "🇨🇩"
      },
      {
        "name": "South Africa",
        "flag": "🇿🇦"
      }
    ]
  },
  {
    "continent": "America",
    "countries": [
      {
        "name": "USA",
        "flag": "🇺🇸"
      },
      {
        "name": "Brazil",
        "flag": "🇧🇷"
      },
      {
        "name": "Mexico",
        "flag": "🇲🇽"
      },
      {
        "name": "Colombia",
        "flag": "🇨🇴"
      },
      {
        "name": "Argentina",
        "flag": "🇦🇷"
      }
    ]
  },
  {
    "continent": "Asia",
    "countries": [
      {
        "name": "China",
        "flag": "🇨🇳"
      },
      {
        "name": "India",
        "flag": "🇮🇳"
      },
      {
        "name": "Indonesia",
        "flag": "🇮🇩"
      },
      {
        "name": "Pakistan",
        "flag": "🇵🇰"
      },
      {
        "name": "Bangladesh",
        "flag": "🇧🇩"
      }
    ]
  },
  {
    "continent": "Europe",
    "countries": [
      {
        "name": "Russia",
        "flag": "🇷🇺"
      },
      {
        "name": "Germany",
        "flag": "🇩🇪"
      },
      {
        "name": "UK",
        "flag": "🇬🇧"
      },
      {
        "name": "France",
        "flag": "🇫🇷"
      },
      {
        "name": "Italy",
        "flag": "🇮🇹"
      }
    ]
  },
  {
    "continent": "Oceania",
    "countries": [
      {
        "name": "Australia",
        "flag": "🇦🇺"
      },
      {
        "name": "Papua New Guinea",
        "flag": "🇵🇬"
      },
      {
        "name": "New Zealand",
        "flag": "🇳🇿"
      },
      {
        "name": "Fiji",
        "flag": "🇫🇯"
      },
      {
        "name": "Solomon Islands",
        "flag": "🇸🇧"
      }
    ]
  }
]

@Component({
  selector: 'app-flag-picker',
  templateUrl: './flag-picker.component.html',
  styleUrls: ['./flag-picker.component.css']
})

export class FlagPickerComponent implements OnInit {
  continentsList = [];
  displayContentList: boolean;
  displayCountryList: boolean;
  selectedCountryList = [];
  flagList = [];
  filteredContientList = [];
  filteredCountryList = [];
  contient: string;
  private activeIndex = 0;
  constructor() { }

  ngOnInit() {
    this.continentsList = continents;
    this.resetFilterContient();
  }
  selectContinent(contient) {
    this.contient = contient.continent;
    this.selectedCountryList = contient.countries;
    this.filteredCountryList = this.selectedCountryList;
    this.displayCountryList = false;
  }
  resetFilterContient() {
    this.filteredContientList = this.continentsList;
  }
  resetCountryList() {
    this.filteredCountryList = this.selectedCountryList;
  }
  public nextActiveMatch(dataList) {
    this.activeIndex = this.activeIndex < dataList.length - 1 ? ++this.activeIndex : this.activeIndex;
  }
  public prevActiveMatch() {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 0;
  }

  updateCheckedFlags(checked, flag) {
    if (checked) {
      this.flagList.push(flag);
    } else {
      this.flagList.splice(this.flagList.indexOf(flag), 1)
    }

  }

  checked(flag) {
    if (this.flagList.indexOf(flag) !== -1) {
      return true;
    }
  }
  getFilteredData(mainData: any, filteredInput: any) {
    return mainData.filter(obj => ((Object.values(obj)).toString().toLocaleLowerCase()).includes(filteredInput.toLocaleLowerCase()));
  }

  searchContinent(event, mainData) {
    if (event.target.value) {
      this.filteredContientList = this.getFilteredData(mainData, event.target.value);
    } else {
      this.resetFilterContient();
    }
    switch (event.keyCode) {
      case 40:
        this.nextActiveMatch(this.filteredContientList);
        break;
      case 38:
        this.prevActiveMatch();
        break;
      case 13:
        this.selectContinent(this.filteredContientList[this.activeIndex]);
        this.displayContentList = false;
        this.activeIndex = 0;
        break;
      case 27:
        this.displayCountryList = false;
        this.activeIndex = 0;
        break;
      default:
        if (event.target.value.length === 0) {
          this.activeIndex = 0;
          this.displayCountryList = false;
          break;
        } else {
          this.displayCountryList = true;
        }
    }

  }
  searchCountry(event, mainData) {
    console.log(event.target.value);
    if (event.target.value) {
      this.filteredCountryList = this.getFilteredData(mainData, event.target.value);
    } else {
      this.resetCountryList();
    }
  }
  clearFlags() {
    this.filteredCountryList = [];
    this.flagList = [];
    this.displayCountryList = false;
    this.contient = '';
  }

  /** test resuable component */
  getUpdatedListData(event) {
    if(event && event.dataType ==='continent' ){
        this.contient = event.contient;
        this.selectedCountryList = event.selectedCountryList;
        this.filteredCountryList = this.selectedCountryList ;
        this.displayCountryList = event.displayCountryList;
        this.displayContentList = false;
    }
    if(event.dataType === 'flagList') {
      this.flagList = event.flagList;
    }
  }

}
