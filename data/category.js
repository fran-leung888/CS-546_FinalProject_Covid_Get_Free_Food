// 后端需要定义数据库

module.exports = {
    getAll() {
        return [{
                title: 'Fast Food',
                subcategories: [{
                        subtitle: 'Burgers',
                        items: [{
                                text: '⏩',
                                link: '/food/list?foodCategory1=Fast%20Food&foodCategory2=Burgers'
                            }
                        ]
                    },
                    {
                        subtitle: 'Pizza',
                        items: [{
                                text: '⏩',
                                link: '/food/list?foodCategory1=Fast%20Food&foodCategory2=Pizza'
                            }
                        ]
                    },
                    {
                        subtitle: 'Sandwiches',
                        items: [{
                            text: '⏩',
                            link: '/food/list?foodCategory1=Fast%20Food&foodCategory2=Sandwiches'
                        }]
                    }
                ]
            },
            {
                title: 'Asian',
                subcategories: [{
                        subtitle: 'Sushi',
                        items: [{
                            text: '⏩',
                            link: '/food/list?foodCategory1=Asian&foodCategory2=Sushi'
                        }]
                    },
                    {
                        subtitle: 'Noodle',
                        items: [{
                            text: '⏩',
                            link: '/food/list?foodCategory1=Asian&foodCategory2=Noodle'
                        }]
                    },
                    {
                        subtitle: 'Dumplings',
                        items: [{
                            text: '⏩',
                            link: '/food/list?foodCategory1=Asian&foodCategory2=Dumplings'
                        }]
                    }
                ]
            },
            {
                title: 'Fried Food',
                subcategories: [{
                        subtitle: 'Fried Chicken',
                        items: [{
                                text: '⏩',
                                link: '/food/list?foodCategory1=Fried%20Food&foodCategory2=Fried%20Chicken'
                            }
                        ]
                    },
                    {
                        subtitle: 'Fries',
                        items: [{
                                text: '⏩',
                                link: '/food/list?foodCategory1=Fried%20Food&foodCategory2=Fries'
                            }
                        ]
                    },
                    {
                        subtitle: 'Fried fish',
                        items: [{
                            text: '⏩',
                            link: '/food/list?foodCategory1=Fried%20Food&foodCategory2=Fried%20fish'
                        }]
                    }
                ]
            },
            {
                title: 'Drink',
                subcategories: [{
                        subtitle: 'Soup',
                        items: [{
                                text: '⏩',
                                link: '/food/list?foodCategory1=Drink&foodCategory2=Soup'
                            }
                        ]
                    },
                    {
                        subtitle: 'Juice',
                        items: [{
                                text: '⏩',
                                link: '/food/list?foodCategory1=Drink&foodCategory2=Juice'
                            }
                        ]
                    },{
                        subtitle: 'Liquor',
                        items: [{
                            text: '⏩',
                            link: '/food/list?foodCategory1=Drink&foodCategory2=Liquor'
                        }
                        ]
                    }
                ]
            },
        ]
    }
}