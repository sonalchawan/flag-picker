import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit , OnChanges{
  @Input() data = [];
  @Input() displayDropDown: boolean;
  @Output() updateData = new EventEmitter<any>();
  @Input() dataType: string;
  filteredList = [];
  flagList = [];
  private activeIndex = 0;

  constructor() { }

  ngOnInit() {
    this.resetFilterData();
  }
  ngOnChanges() {
    this.resetFilterData();
  }
  resetFilterData() {
    this.filteredList = this.data;
  }

  search(event, mainData) {
    if (event.target.value) {
      this.filteredList = this.getFilteredData(mainData, event.target.value);
    } else {
      this.resetFilterData();
    }
    switch (event.keyCode) {
      case 40:
        this.nextActiveMatch(this.filteredList);
        break;
      case 38:
        this.prevActiveMatch();
        break;
      case 13:
        if (this.dataType === 'continent'){
        this.selectContinent(this.filteredList[this.activeIndex]);
        }
        this.displayDropDown = false;
        this.activeIndex = 0;
        break;
      case 27:
        this.displayDropDown = false;
        this.activeIndex = 0;
        break;
      default:
        if (event.target.value.length === 0) {
          this.activeIndex = 0;
          this.displayDropDown = false;
          break;
        } else {
          this.displayDropDown = true;
        }
    }

  }
  getFilteredData(mainData: any, filteredInput: any) {
    return mainData.filter(obj => ((Object.values(obj)).toString().toLocaleLowerCase()).includes(filteredInput.toLocaleLowerCase()));
  }
  public nextActiveMatch(dataList) {
    this.activeIndex = this.activeIndex < dataList.length - 1 ? ++this.activeIndex : this.activeIndex;
  }
  public prevActiveMatch() {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 0;
  }

  onBlur() {
    if (this.dataType === 'continent') {
       this.displayDropDown = false;
    } else {
      this.displayDropDown = true;
    }
  }

  selectContinent(data) {
    const continentData = {
      dataType : this.dataType,
      contient : data.continent,
      selectedCountryList: data.countries,
      displayCountryList: false
    }
    this.updateData.emit(continentData);
  }

  checked(flag) {
    if (this.flagList.indexOf(flag) !== -1) {
      return true;
    }
  }

  updateCheckedFlags(checked, flag) {
    if (checked) {
      this.flagList.push(flag);
    } else {
      this.flagList.splice(this.flagList.indexOf(flag), 1);
    }
    const flagData = {
      dataType : 'flagList',
      flagList :  this.flagList
    }
    this.updateData.emit(flagData);

  }


}
