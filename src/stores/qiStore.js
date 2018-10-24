import {extendObservable, action} from 'mobx';
import {get, post} from '../lib/http'
import request from 'superagent-bluebird-promise'
import _ from 'lodash'
import Cookie from 'js-cookie'
import moment from 'moment'

class QiStore {
  constructor() {
    extendObservable(this, {
      myTasks: [],
      vendors: [],
      selectedVendorSurveys: [],
      surveyInfo: {info: 'stuff'},
      selectedSurvey: {},
      selectedPage: 'home'
    });
  }

  setSelectedPage = action((selectedPage) => {
    this.selectedPage = selectedPage
  });
  
  getSurveyInfo = action((cmId) => {
    return this.surveyInfo
  });

  getMyTasks = action(() => {
    const context = this
    return new Promise(function(resolve, reject) {
      const tasks = [
                          {
                            project: 'Game of Thrones',
                            category: 'Finance',
                            vendor: 'EMI',
                            rush: true,
                            status: {statusId:10,
                                     stats: {invite:600, start:300, oq:50, ir:20, dropout:50, complete:20},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne10'}, {first_name: 'Christina4', last_name: 'Dobi10'}, {first_name: 'Arti ', last_name: 'Singhapakdi10'}],
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-10',
                            dueDate: '2018-09-24',
                            revenue: 600
                          },
                          {
                            project: 'Bond - Casino Royale',
                            category: 'Finance',
                            vendor: 'EMI',
                            status: {statusId: 10,
                                     stats: {invite:700, start:250, oq:50, ir:20, dropout:50, complete:20},
                                    },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne10'}, {first_name: 'Christina', last_name: 'Dobi10'}, {first_name: 'Arti ', last_name: 'Singhapakdi10'}],
                            daysInStatus: 10,
                            action: 'Close Quote | Accept Quote',
                            createDate: '2018-09-11',
                            dueDate: '2018-09-25',
                            revenue: 700
                          },
                          {
                            project: 'Internet of things3',
                            category: 'Finance',
                            vendor: 'EMI',
                            status: {statusId: 11,
                                     stats: {invite:800, start:500, oq:50, ir:20, dropout:50, complete:20},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne11'}, {first_name: 'Christina', last_name: 'Dobi11'}, {first_name: 'Arti ', last_name: 'Singhapakdi11'}],
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-12',
                            dueDate: '2018-09-26',
                            revenue: 800
                          },
                          {
                            project: 'Transportation of stuff and loads of other stuff4',
                            category: 'Healthcare',
                            vendor: 'EMI',
                            rush: true,
                            status: {statusId:12,
                                     stats: {invite:900, start:200, oq:50, ir:20, dropout:50, complete:20},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne12'}, {first_name: 'Christina', last_name: 'Dobi12'}, {first_name: 'Arti ', last_name: 'Singhapakdi12'}],
                            daysInStatus: 10,
                            action: 'Not on target - Add CMs',
                            createDate: '2018-09-13',
                            dueDate: '2018-09-27',
                            revenue: 900
                          },
                          {
                            project: 'AC/DC Thunderstruck',
                            category: 'Healthcare',
                            vendor: 'Russell Research',
                            status: {statusId:12,
                                     stats: {invite:1000, start:950, oq:50, ir:20, dropout:50, complete:20},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne12'}, {first_name: 'Christina', last_name: 'Dobi12'}, {first_name: 'Arti ', last_name: 'Singhapakdi12'}],
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-14',
                            dueDate: '2018-09-28',
                            revenue: 1000
                          },
                          {
                            project: 'Diesel and Dust',
                            category: 'Technology',
                            vendor: 'Precision Sample',
                            status: {statusId:13,
                                     stats: {invite:1100, start:100, oq:50, ir:20, dropout:50, complete:20},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne13'}, {first_name: 'Christina', last_name: 'Dobi13'}, {first_name: 'Arti ', last_name: 'Singhapakdi13'}],
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-15',
                            dueDate: '2018-09-29',
                            revenue: 1100
                          },
                          {
                            project: 'Mission Impossible III',
                            category: 'Chemicals',
                            vendor: 'Precision Sample',
                            status: {statusId:14,
                                     stats: {invite:1200, start:200, oq:50, ir:20, dropout:50, complete:250},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne14'}, {first_name: 'Christina', last_name: 'Dobi14'}, {first_name: 'Arti ', last_name: 'Singhapakdi14'}],
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-15',
                            dueDate: '2018-09-30',
                            revenue: 1100
                          },
                          {
                            project: 'Lord of the rings',
                            category: 'Chemicals',
                            vendor: 'Rare Patient Voice',
                            status: {statusId:10,
                                     stats: {invite:1300, start:300, oq:50, ir:20, dropout:50, complete:200},
                                   },
                            asignees:[{first_name: 'Jack', last_name: 'Byrne10'}, {first_name: 'Evelyn', last_name: 'Kavanagh10'}, {first_name: 'Arti ', last_name: 'Singhapakdi10'}],
                            action: 'Create Quote',
                            createDate: '2018-09-15',
                            dueDate: '2018-10-01',
                            revenue: 1100
                          },
                        ];
        context.myTasks = tasks
        resolve()
    });
  });

  saveSurveyLead = action((lead) => {
    console.log('saveSurveyLead: ', JSON.stringify(lead));
  });

  setSelectedSurvey = action((survey) => {
    survey.cms = [{title:'Director Level', location:'United States', rate:30, status: 'Attached', statusDate: '2018-07-09'},
                  {title:'Director Level1', location:'United States', rate:30, status: 'Invited', statusDate: '2018-07-10'},
                  {title:'Director Level1', location:'United States', rate:30, status: 'Invited', statusDate: '2018-07-11'},
                  {title:'Director Level2', location:'United States', rate:30, status: 'Accepted', statusDate: '2018-07-12'},
                  {title:'Director Level2', location:'United States', rate:30, status: 'Blocked', statusDate: '2018-07-13'},
                  {title:'Director Level2', location:'United States', rate:30, status: 'Invited', statusDate: '2018-07-14'}
                 ]
    this.selectedSurvey = survey
  });

  getVendors = action(() => {
    const context = this
    return new Promise(function(resolve, reject) {
      const vendors = [
                          {
                            name: 'EMI',
                            completed: 250,
                            excluded: 65
                          },
                          {
                            name: 'Precision Sample',
                            completed: 250,
                            excluded: 85
                          },
                          {
                            name: 'Rare Patient Voice',
                            completed: 250,
                            excluded: 95
                          },
                          {
                            name: 'Research Now',
                            completed: 250,
                            excluded: 120
                          },
                          {
                            name: 'Russell Research',
                            completed: 250,
                            excluded: 150
                          },

                        ];
        context.vendors = vendors
        resolve()
    });
  });

  setSelectedVendor = action((vendor) => {
    const selectedVendorSurveys = [
                                    {
                                      project: 'BCG - Internet of things1',
                                      category: 'Healthcare',
                                      status: {statusId:10,
                                               stats: {invite:800, start:300, oq:50, ir:20, dropout:50, complete:20},
                                              },
                                    },
                                    {
                                      project: 'BCG - Internet of things2',
                                      category: 'Healthcare',
                                      status: {statusId:10,
                                               stats: {invite:900, start:400, oq:50, ir:20, dropout:50, complete:20},
                                             },
                                    },
                                    {
                                      project: 'BCG - Internet of things3',
                                      category: 'Healthcare',
                                      status: {statusId:10,
                                               stats: {invite:1000, start:500, oq:50, ir:20, dropout:50, complete:20},
                                             },
                                    },
                                    {
                                      project: 'BCG - Internet of things4',
                                      category: 'Healthcare',
                                      status: {statusId:10,
                                               stats: {invite:1100, start:600, oq:50, ir:20, dropout:50, complete:20},
                                             },
                                    },
                                    {
                                      project: 'BCG - Internet of things5',
                                      category: 'Technology',
                                      status: {statusId:10,
                                               stats: {invite:1200, start:700, oq:50, ir:20, dropout:50, complete:20},
                                             },
                                    },
                                    {
                                      project: 'BCG - Internet of things6',
                                      category: 'Finance',
                                      status: {statusId:10,
                                               stats: {invite:1300, start:800, oq:50, ir:20, dropout:50, complete:20},
                                             },
                                    },
                                    {
                                      project: 'BCG - Internet of things7',
                                      category: 'Finance',
                                      status: {statusId:10,
                                               stats: {invite:1400, start:900, oq:50, ir:20, dropout:50, complete:20},
                                             },
                                    },

                                  ]
    this.selectedVendorSurveys = selectedVendorSurveys
  });
}

export default QiStore;
