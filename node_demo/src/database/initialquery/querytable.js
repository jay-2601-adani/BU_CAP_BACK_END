const queryarray=[
    `CREATE TABLE IF NOT EXISTS bu( buid INTEGER AUTO_INCREMENT, buname VARCHAR(256) NOT NULL, UNIQUE (buname), PRIMARY KEY (buid));`,
    `create table IF NOT EXISTS L1_Capabilities ( l1id integer auto_increment, l1name varchar(256) NOT NULL,BUid integer not null,ctype varchar(256) NOT NULL,UNIQUE (l1name ,BUid,ctype) ,primary key(l1id) ,foreign key (BUid) references BU(buid)) ;`,
    `create table if not exists L2_Capabilities( l2id integer auto_increment, l2name varchar(256) not null, parentid integer not null, ctype varchar(256) NOT NULL,unique(l2id,l2name,ctype,parentid), primary key(l2id), foreign key (parentid) references L1_Capabilities(l1id) );`,
    `create table if not exists L3_Capabilities( l3id integer auto_increment, l3name varchar(256) not null, parentid integer not null, ctype varchar(256) NOT NULL,unique(l3id,l3name,ctype,parentid), primary key(l3id), foreign key (parentid) references L2_Capabilities(l2id) );`,
    
    // `create table if not exists applications( appid integer auto_increment not null, appname varchar(256) not null , buid integer not null, apmid integer not null, unique(apmid,appname), primary key(appid), foreign key (buid) references bu(buid) );`
]

module.exports=queryarray