// 后端需要定义数据库

module.exports = {
    getAll() {
        return [{
                title: 'An Item',
                subcategories: [{
                        subtitle: 'Category A',
                        items: [{
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            }
                        ]
                    },
                    {
                        subtitle: 'Category B',
                        items: [{
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            }
                        ]
                    },
                    {
                        subtitle: 'Category B',
                        items: [{
                            text: 'Item A',
                            link: '#'
                        }]
                    }
                ]
            },
            {
                title: 'A Second Item',
                subcategories: [{
                        subtitle: 'Category C',
                        items: [{
                            text: 'Item E',
                            link: '#'
                        }]
                    },
                    {
                        subtitle: 'Category D',
                        items: [{
                            text: 'Item F',
                            link: '#'
                        }]
                    }
                ]
            },
            {
                title: 'A third Item',
                subcategories: [{
                        subtitle: 'Category A',
                        items: [{
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            }
                        ]
                    },
                    {
                        subtitle: 'Category B',
                        items: [{
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            }
                        ]
                    },
                    {
                        subtitle: 'Category B',
                        items: [{
                            text: 'Item A',
                            link: '#'
                        }]
                    }
                ]
            },
            {
                title: 'A fourth Item',
                subcategories: [{
                        subtitle: 'Category A',
                        items: [{
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            }
                        ]
                    },
                    {
                        subtitle: 'Category B',
                        items: [{
                                text: 'Item A',
                                link: '#'
                            },
                            {
                                text: 'Item A',
                                link: '#'
                            }
                        ]
                    },
                ]
            },
        ]
    }
}