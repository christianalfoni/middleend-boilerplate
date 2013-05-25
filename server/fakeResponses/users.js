define(function () {
    'use strict';
    var users = [
        {
            "displayName":"Åse Gisleberg",
            "emailAddress":"Ase.Gisleberg@marcello.no"
        },
        {
            "displayName":"Thomas Klokkerhaug",
            "emailAddress":"Thomas.Klokkerhaug@marcello.no"
        },
        {
            "displayName":"Paul G. Austdal",
            "emailAddress":"Paul.G.Austdal@marcello.no"
        },
        {
            "displayName":"Agnar Hessevik",
            "emailAddress":"Agnar.Hessevik@marcello.no"
        },
        {
            "displayName":"backup bck.",
            "emailAddress":"backup@marcello.no"
        },
        {
            "displayName":"Mats Reinsby",
            "emailAddress":"Mats.Reinsby@marcello.no"
        },
        {
            "displayName":"Tonny Roger Holm",
            "emailAddress":"Tonny.Roger.Holm@marcello.no"
        },
        {
            "displayName":"Peter Magnus Prestesæter",
            "emailAddress":"Peter.Magnus.Prestesaeter@marcello.no"
        },
        {
            "displayName":"Bård Erik Jacobsen",
            "emailAddress":"Bard.Erik.Jacobsen@marcello.no"
        },
        {
            "displayName":"Gunnar Gisleberg",
            "emailAddress":"Gunnar.Gisleberg@marcello.no"
        },
        {
            "displayName":"Tillitsvalgt",
            "emailAddress":"tillitsvalgt@marcello.no"
        },
        {
            "displayName":"Kenneth Nygård",
            "emailAddress":"Kenneth.Nygard@marcello.no"
        },
        {
            "displayName":"Ole Fredrik Holm",
            "emailAddress":"Ole.Fredrik.Holm@marcello.no"
        },
        {
            "displayName":"Vidar Bakke",
            "emailAddress":"Vidar.Bakke@marcello.no"
        },
        {
            "displayName":"Tove Skapalen",
            "emailAddress":"Tove.Skapalen@marcello.no"
        },
        {
            "displayName":"Werner Vesterås",
            "emailAddress":"Werner.Vesteras@marcello.no"
        },
        {
            "displayName":"Anette Gjertsen",
            "emailAddress":"Anette.Gjertsen@marcello.no"
        },
        {
            "displayName":"Thao Le",
            "emailAddress":"Thao.Huong.Le@marcello.no"
        },
        {
            "displayName":"Gry Skårbø",
            "emailAddress":"Gry.Skarbo@marcello.no"
        },
        {
            "displayName":"Andreas Jacobsen",
            "emailAddress":"Andreas.Jacobsen@marcello.no"
        },
        {
            "displayName":"Kjetil Aune",
            "emailAddress":"Kjetil.Aune@marcello.no"
        },
        {
            "displayName":"Finn Arne Nystad",
            "emailAddress":"fan@marcello.no"
        },
        {
            "displayName":"Ståle Karlsen",
            "emailAddress":"Stale.Karlsen@marcello.no"
        },
        {
            "displayName":"Fredrik Holmberg",
            "emailAddress":"Fredrik.Holmberg@marcello.no"
        },
        {
            "displayName":"Bjørn Pedersen",
            "emailAddress":"Bjorn.Pedersen@marcello.no"
        },
        {
            "displayName":"Andreas Giske",
            "emailAddress":"Andreas.Giske@marcello.no"
        },
        {
            "displayName":"Pål-Trygve Gamme",
            "emailAddress":"Pal-Trygve.Gamme@marcello.no"
        },
        {
            "displayName":"Kristoffer Siegel",
            "emailAddress":"Kristoffer.Siegel@marcello.no"
        },
        {
            "displayName":"Karim Skogheim",
            "emailAddress":"Karim.Skogheim@marcello.no"
        },
        {
            "displayName":"Sadik M",
            "emailAddress":"Sadik.M@marcello.no"
        },
        {
            "displayName":"Fredrik Spolen",
            "emailAddress":"Fredrik.Spolen@marcello.no"
        },
        {
            "displayName":"Unn Iren",
            "emailAddress":"Unn.Iren@marcello.no"
        },
        {
            "displayName":"Vemund Ally",
            "emailAddress":"Vemund.Ally@marcello.no"
        },
        {
            "displayName":"Thomas Torstveit",
            "emailAddress":"Thomas.Torstveit@marcello.no"
        },
        {
            "displayName":"Vemund",
            "emailAddress":"Vemund@marcello.no"
        },
        {
            "displayName":"Carl Petter Johansen",
            "emailAddress":"Carl.Petter.Johansen@marcello.no"
        },
        {
            "displayName":"Stig Monsrud",
            "emailAddress":"Stig.Monsrud@marcello.no"
        },
        {
            "displayName":"Gunnhild Håhjem",
            "emailAddress":"Gunnhild.Hahjem@marcello.no"
        },
        {
            "displayName":"Jørgen Veøy",
            "emailAddress":"Jorgen.Veoy@marcello.no"
        },
        {
            "displayName":"Morten Anderson",
            "emailAddress":"Morten.Anderson@marcello.no"
        },
        {
            "displayName":"Nina Skarbo",
            "emailAddress":"Nina.Skarbo@marcello.no"
        },
        {
            "displayName":"Simen Roligheten",
            "emailAddress":"Simen.Roligheten@marcello.no"
        },
        {
            "displayName":"Morten Biering",
            "emailAddress":"Morten.Biering@marcello.no"
        },
        {
            "displayName":"Arne Steimoeggen",
            "emailAddress":"Arne.Steimoeggen@marcello.no"
        },
        {
            "displayName":"Nina Mikhailova",
            "emailAddress":"Nina.Mikhailova@marcello.no"
        },
        {
            "displayName":"CruiseControl",
            "emailAddress":"CruiseControl@marcello.no"
        },
        {
            "displayName":"Demian Amundsen",
            "emailAddress":"Demian.Amundsen@marcello.no"
        },
        {
            "displayName":"Hein Asgeir Sandvik",
            "emailAddress":"Hein.Asgeir.Sandvik@marcello.no"
        },
        {
            "displayName":"Haakon Holgersen",
            "emailAddress":"Haakon.Holgersen@marcello.no"
        },
        {
            "displayName":"Jørund Rian",
            "emailAddress":""
        },
        {
            "displayName":"Eivind Sollie",
            "emailAddress":"Eivind.Sollie@marcello.no"
        },
        {
            "displayName":"Jan Kristian Osland",
            "emailAddress":"Jan.Kristian.Osland@marcello.no"
        },
        {
            "displayName":"Andreas Monsen",
            "emailAddress":"Andreas.Monsen@marcello.no"
        },
        {
            "displayName":"Kenneth Jøleid",
            "emailAddress":"Kenneth.Joleid@marcello.no"
        },
        {
            "displayName":"Thomas Skretteberg",
            "emailAddress":"Thomas.Skretteberg@marcello.no"
        },
        {
            "displayName":"systems_test",
            "emailAddress":"systems_test@marcello.no"
        },
        {
            "displayName":"Petter Sætremyr",
            "emailAddress":"Petter.Saetremyr@marcello.no"
        },
        {
            "displayName":"Heidi Furland",
            "emailAddress":"Heidi.Furland@marcello.no"
        },
        {
            "displayName":"Ola Eriksen",
            "emailAddress":"Ola.Kannick.Eriksen@marcello.no"
        },
        {
            "displayName":"Marianne Helgerud",
            "emailAddress":"Marianne.Helgerud@marcello.no"
        },
        {
            "displayName":"Marius Gisleberg",
            "emailAddress":"Marius.Gisleberg@marcello.no"
        },
        {
            "displayName":"Mikkel Gisleberg",
            "emailAddress":"Mikkel.Gisleberg@marcello.no"
        },
        {
            "displayName":"Marius Forsmo Langseth",
            "emailAddress":"Marius.Forsmo.Langseth@marcello.no"
        },
        {
            "displayName":"Petter Lundby",
            "emailAddress":"Petter.Lundby@marcello.no"
        },
        {
            "displayName":"Per-Karsten Nordhaug",
            "emailAddress":"Per-Karsten.Nordhaug@marcello.no"
        },
        {
            "displayName":"Roar Lødemel Rønningen",
            "emailAddress":"Roar.Lodemel.Ronningen@marcello.no"
        },
        {
            "displayName":"Rune Jacobsen",
            "emailAddress":"Rune.Jacobsen@marcello.no"
        },
        {
            "displayName":"Rolf Erik Christensen",
            "emailAddress":"Rolf.Erik.Christensen@marcello.no"
        },
        {
            "displayName":"Simen Storvik Kristiansen",
            "emailAddress":"Simen.Storvik.Kristiansen@marcello.no"
        },
        {
            "displayName":"Sven-Erik Lie",
            "emailAddress":"Sven-Erik.Lie@marcello.no"
        },
        {
            "displayName":"Svein-Ole Retteråsen",
            "emailAddress":"Svein-Ole.Retterasen@marcello.no"
        },
        {
            "displayName":"Tore Scheffler",
            "emailAddress":"Tore.Scheffler@marcello.no"
        },
        {
            "displayName":"Synnøve Bertelsen",
            "emailAddress":""
        },
        {
            "displayName":"Øyvind Ballestad",
            "emailAddress":"Oyvind.Ballestad@marcello.no"
        },
        {
            "displayName":"Trond Røren Leine",
            "emailAddress":"Trond.Roren.Leine@marcello.no"
        },
        {
            "displayName":"Axel Holm",
            "emailAddress":"axel.holm@marcello.no"
        },
        {
            "displayName":"Adrian Tangen",
            "emailAddress":"Adrian.Tangen@marcello.no"
        },
        {
            "displayName":"Aksel Bjelland",
            "emailAddress":"Aksel.Bjelland@marcello.no"
        },
        {
            "displayName":"Marius Borge",
            "emailAddress":"Marius.Borge@marcello.no"
        },
        {
            "displayName":"Reno Dokken",
            "emailAddress":"Reno.Dokken@marcello.no"
        },
        {
            "displayName":"Tor Onsager",
            "emailAddress":"Tor.Onsager@marcello.no"
        },
        {
            "displayName":"Christian Jørgensen",
            "emailAddress":"Christian.Jorgensen@marcello.no"
        },
        {
            "displayName":"Anne Kathrine Gaarder",
            "emailAddress":"Anne.Kathrine.Gaarder@marcello.no"
        },
        {
            "displayName":"Morten Havneraas",
            "emailAddress":"morten.havneraas@marcello.no"
        },
        {
            "displayName":"Ole Fredrik Holm",
            "emailAddress":""
        },
        {
            "displayName":"Simen Brunstad",
            "emailAddress":"Simen.Brunstad@marcello.no"
        },
        {
            "displayName":"Richard Ljunggren",
            "emailAddress":""
        },
        {
            "displayName":"Arbeidsrom GT. 4",
            "emailAddress":"Arbeidsrom.42@marcello.no"
        },
        {
            "displayName":"Joakim Gumø",
            "emailAddress":"Joakim.Gumo@marcello.no"
        },
        {
            "displayName":"Martin Karlsen",
            "emailAddress":"Martin.Karlsen@marcello.no"
        },
        {
            "displayName":"Stian Ask",
            "emailAddress":"Stian.Ask@marcello.no"
        },
        {
            "displayName":"Christian Engdahl Sørensen",
            "emailAddress":"Christian.Engdahl.Sorensen@marcello.no"
        },
        {
            "displayName":"Marius Nordahl Sagen",
            "emailAddress":"marius.sagen@marcello.no"
        },
        {
            "displayName":"Mona Grudt",
            "emailAddress":"Mona.Grudt@marcello.no"
        },
        {
            "displayName":"Bengt Olsson",
            "emailAddress":"Bengt.Olsson@marcello.no"
        },
        {
            "displayName":"Cathrine Sook Hansen",
            "emailAddress":"Cathrine.Hansen@marcello.no"
        },
        {
            "displayName":"Tobias Ståhl",
            "emailAddress":"Tobias.Stahl@marcello.no"
        },
        {
            "displayName":"Celine Pettersen",
            "emailAddress":"Celine.Pettersen@marcello.no"
        },
        {
            "displayName":"Christoffer Strömgren",
            "emailAddress":"Christoffer.Stromgren@marcello.no"
        },
        {
            "displayName":"Citrix.Marcello",
            "emailAddress":"citrix.marcello@marcello.no"
        },
        {
            "displayName":"Tommy Østgaard",
            "emailAddress":"Tommy.Ostgaard@marcello.no"
        },
        {
            "displayName":"Kristoffer Torp",
            "emailAddress":"Kristoffer.Torp@marcello.no"
        },
        {
            "displayName":"Ivar AH. Sandvik",
            "emailAddress":"Ivar.Sandvik@marcello.no"
        },
        {
            "displayName":"Fredrik E. Sæbø",
            "emailAddress":"Fredrik.Saebo@marcello.no"
        },
        {
            "displayName":"Aleksander Gisvold",
            "emailAddress":"Aleksander.Gisvold@marcello.no"
        },
        {
            "displayName":"Martin Norgaard",
            "emailAddress":"Martin.Norgaard@marcello.no"
        },
        {
            "displayName":"Ole-Harald Bjella",
            "emailAddress":"Ole-Harald.Bjella@marcello.no"
        },
        {
            "displayName":"Magnus Raaum",
            "emailAddress":"Magnus.Raaum@marcello.no"
        },
        {
            "displayName":"Connie Larsen",
            "emailAddress":"Connie.Larsen@marcello.no"
        },
        {
            "displayName":"Espen Høglund",
            "emailAddress":"Espen.Hoglund@marcello.no"
        },
        {
            "displayName":"Bård Enger",
            "emailAddress":"Bard.Enger@marcello.no"
        },
        {
            "displayName":"testbruker",
            "emailAddress":""
        },
        {
            "displayName":"Connie",
            "emailAddress":"Connie@marcello.no"
        },
        {
            "displayName":"jenkins",
            "emailAddress":""
        },
        {
            "displayName":"Philip Meholm",
            "emailAddress":"Philip.Meholm@marcello.no"
        },
        {
            "displayName":"Alexander Koch",
            "emailAddress":""
        },
        {
            "displayName":"Bjørn-Terje Stenberg Aastorp",
            "emailAddress":""
        },
        {
            "displayName":"Support",
            "emailAddress":""
        },
        {
            "displayName":"Olav Smedstad",
            "emailAddress":"Olav.Smedstad@marcello.no"
        },
        {
            "displayName":"Hege Wallem",
            "emailAddress":"Hege.Wallem@marcello.no"
        },
        {
            "displayName":"Tommy Olsson",
            "emailAddress":"Tommy.Olsson@marcello.no"
        },
        {
            "displayName":"Claudia Campos",
            "emailAddress":"Claudia.Campos@marcello.no"
        },
        {
            "displayName":"Grethe Roesen Aae",
            "emailAddress":"Grethe.Roesen.Aae@marcello.no"
        },
        {
            "displayName":"Joakim Hedlund",
            "emailAddress":""
        },
        {
            "displayName":"Malin Solbakken",
            "emailAddress":"Malin.Ask.Solbakken@marcello.no"
        },
        {
            "displayName":"Malcolm Lindahl",
            "emailAddress":"Malcolm.Lindahl@marcello.no"
        },
        {
            "displayName":"Hans-Arne Bjella",
            "emailAddress":"Hans-Arne.Bjella@marcello.no"
        },
        {
            "displayName":"Vidar Granberg Kristoffersen",
            "emailAddress":"Vidar.kristoffersen@marcello.no"
        },
        {
            "displayName":"Henrik Morstad",
            "emailAddress":"Henrik.Morstad@marcello.no"
        },
        {
            "displayName":"Richard.Stubberud",
            "emailAddress":"Richard.Stubberud@marcello.no"
        },
        {
            "displayName":"Stian Prestmarken",
            "emailAddress":"Stian.Prestmarken@marcello.no"
        },
        {
            "displayName":"Eva Berge",
            "emailAddress":""
        },
        {
            "displayName":"Henrik Sande",
            "emailAddress":"Henrik.Sande@marcello.no"
        },
        {
            "displayName":"Oscar Elgquist",
            "emailAddress":"Oscar.Elgquist@marcello.no"
        },
        {
            "displayName":"Ellinor Teisbo Haldorsen",
            "emailAddress":"Ellinor.Teisbo.Haldorsen@marcello.no"
        },
        {
            "displayName":"Nhan Nguyen",
            "emailAddress":"Nhan.Nguyen@marcello.no"
        },
        {
            "displayName":"Jonas Jansen Lauvlid",
            "emailAddress":"Jonas.Lauvlid@marcello.no"
        },
        {
            "displayName":"exchange test",
            "emailAddress":"exchange.test@marcello.no"
        },
        {
            "displayName":"Sandra Wong",
            "emailAddress":"Sandra.Wong@marcello.no"
        },
        {
            "displayName":"Roy Arne Nordmarken",
            "emailAddress":"Roy.Arne.Nordmarken@marcello.no"
        },
        {
            "displayName":"Morten Kristoffersen",
            "emailAddress":"Morten.Kristoffersen@marcello.no"
        },
        {
            "displayName":"Eirik Nerlie",
            "emailAddress":"Eirik.Nerlie@marcello.no"
        },
        {
            "displayName":"Magne Hjermann",
            "emailAddress":"magne.hjermann@marcello.no"
        },
        {
            "displayName":"Arnt Richard Johansen",
            "emailAddress":"Arnt.Richard.Johansen@marcello.no"
        },
        {
            "displayName":"Nina Gu",
            "emailAddress":"Nina.Gu@marcello.no"
        },
        {
            "displayName":"Eirik Caspari",
            "emailAddress":"eirik.caspari@marcello.no"
        },
        {
            "displayName":"Torbjørn Martinsen",
            "emailAddress":"Torbjorn.Martinsen@marcello.no"
        },
        {
            "displayName":"ivar lync test",
            "emailAddress":""
        },
        {
            "displayName":"lync test user",
            "emailAddress":""
        },
        {
            "displayName":"test.exchange",
            "emailAddress":"exchange.test2@marcello.no"
        },
        {
            "displayName":"Ole-Jørgen Blom",
            "emailAddress":""
        },
        {
            "displayName":"Sathees.Thayaparan",
            "emailAddress":"Sathees.Thayaparan@marcello.no"
        }
    ];

    return function (query) {
        var user,
            result = [];

        if (query.length > 0) {
            for (var x = 0; x < users.length; x++) {
                user = users[x];
                if (user.displayName.toLowerCase().substr(0, query.length) === query.toLowerCase()) {
                    result.push(user);
                }
            }
        }
        return result;

    };
});