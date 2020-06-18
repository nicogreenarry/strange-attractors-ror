# These are all temporary methods meant to be run after deploying. Any of these methods can be
# deleted 7 days after they were added, unless a comment explicitly indicates otherwise.
#
# If you want to create a long-lasting method, you should probably add it to another class.
module AfterShip
  def self.attractors_to_save
    [
      {
        coefficients: [-1.2,0,0.7,0,0.1,0.4,0.4,1.1,0.8,1.2,-0.6,-1.2],
        start_xy: [0,0]
      },
      {
        coefficients: [-1,0.9,0.4,-0.2,-0.6,-0.5,0.4,0.7,0.3,-0.5,0.7,-0.8],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.7,-0.4,0.5,-1,-0.9,-0.8,0.5,0.5,0.3,0.9,-0.1,-0.9],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.6,-0.4,-0.4,-0.8,0.7,0.3,-0.4,0.4,0.5,0.5,0.8,-0.1],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.6,-0.1,1.1,0.2,-0.8,0.6,-0.7,0.7,0.7,0.3,0.6,0.9],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.6,1.1,0.4,0.6,0.1,0.6,-0.2,-0.8,-0.8,-1,0.7,1.1],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.5,-0.6,0.8,-0.5,-0.9,0.3,-0.5,0.1,0.6,-0.6,0.2,-0.5],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.4,-0.1,-0.4,-1.1,0.9,0.3,-0.2,-0.3,1,-0.6,0.5,0.5],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.1,0.8,-0.7,-1.1,-1.1,-0.7,-0.4,0.6,-0.6,-0.3,1.2,0.6],
        start_xy: [0,0]
      },
      {
        coefficients: [0,-1,0.5,-1.1,-0.4,0.3,0.2,0.3,-0.5,0.7,-1.1,0.1],
        start_xy: [0,0]
      },
      {
        coefficients: [0,-0.9,0.9,-1.2,-0.4,-0.9,0.2,1.2,-0.5,1.2,-0.8,-1.2],
        start_xy: [0,0]
      },
      {
        coefficients: [0.2,-0.9,-0.6,0.4,-1,0.1,1.1,0.2,-0.9,0.1,1.2,-1.2],
        start_xy: [0,0]
      },
      {
        coefficients: [0.4,-0.7,-0.7,0.9,0.6,-0.1,0,-0.3,-0.3,-0.6,-1,0.5],
        start_xy: [0,0]
      },
      {
        coefficients: [0.8,1,-1.2,-1,1.1,-0.9,0.4,-0.4,-0.6,-0.2,-0.5,-0.7],
        start_xy: [0,0]
      },
      {
        coefficients: [0.9,-1.1,1,0.1,-1.1,-0.9,-0.8,-0.1,1.2,-0.5,0.8,-0.1],
        start_xy: [0,0]
      },
      {
        coefficients: [1,0.1,-1,0.6,-0.1,-0.7,-0.1,-0.6,-0.4,-0.5,-0.6,-0.1],
        start_xy: [0,0]
      },
      {
        coefficients: [0.08179555971879315,-0.02459801463335376,0.044770270473528884,0.9221455135496612,-0.9973919972953295,-0.3834522880774589,0.11542092708246665,0.9805488687940442,0.5715287087932401,0.37844444430071156,-0.11006221263266913,0.3163960319859762],
        start_xy: [0,0]
      },
      {
        coefficients: [-1.0465314214699357,-0.11810346649619818,0.9662515751352296,0.8385634107099611,0.03639813048980178,0.4253929203072062,-0.27234843015660315,0.9436199594018053,-0.08129221648015084,0.2891155467085669,0.7135566042172778,0.8112620352787523],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.06310263014972994,-1.001172645052796,0.20860604594503918,-1.0232552434342843,0.09906923627046238,0.08284318930795331,-0.06400291892559928,0.4281973659008149,1.0125745634590657,-0.10628945725110683,0.865172399892385,-0.08486024657845226],
        start_xy: [0,0]
      },
      {
        coefficients: [-1.0318129217647105,0.9214841230559745,0.3661454509851769,0.40894887515391276,-0.6707172703270613,-0.44227015904617695,0.3016114276861641,-0.07157719343884317,-0.598524097441637,0.2928894024027735,-0.8896046902556218,-0.8108188802701117],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.5276659662280693,-1.0312667275370713,0.12636687163566718,-0.46804494779618966,0.13923392298309412,-0.8986240965155039,0.38737210566479385,-0.29006571554865346,-0.3408429257638712,0.9228589733810846,-0.04984135776411103,-0.9093024635211264],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.8076385959994972,0.6120539847479047,-0.22507376036128657,0.6891612501408233,-0.1992805664569628,0.19648331234327765,0.09265877426144575,-1.0392908655094384,-0.8448453010062056,1.1903620842172005,0.9971171188063297,-0.20282435689728628],
        start_xy: [0,0]
      },
      {
        coefficients: [-1.0686971861297558,0.8427138327937287,0.9006780489285038,0.9309021671983453,-0.5635786808351663,-0.35036200449789245,-1.0954945683889756,1.0221962564877318,0.12479658258882309,0.9545192966037888,-0.19526855708728696,0.3719234327884817],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.5715646091513168,-0.15287739181565652,0.2570894262113397,0.987155989918074,0.9788805880806926,-0.6766416102195076,0.7077511335379509,-0.9232330996022602,-0.8473575614112865,0.6731382590236001,0.3637135609769131,0.22832514434172202],
        start_xy: [0,0]
      },
      {
        coefficients: [0.8807277110844918,-0.7603641468307958,-0.5876182936070823,0.5977780750867363,0.6095143991055132,-0.3779159129535552,0.26814301917573946,-1.1993714279919379,0.17023567347099067,-0.9390497131400751,0.29464129689373975,0.4305979964055793],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.15466739377215477,-1.039356142360215,0.25752668896969855,1.1846790962331848,-0.24376368781466307,-0.7570023306895022,0.5670078114132497,-0.32725762683488124,-0.6004567237075417,-0.8281224453861642,0.12758550153709014,-0.09495650420828872],
        start_xy: [0,0]
      },
      {
        coefficients: [0.8681871149580915,-1.0066075179161111,-0.5898242045859406,-0.4391287164588418,-0.8227458281700559,-0.2277750368797642,0.764207138434926,0.1836962524346759,0.07177054778205161,-0.26659539759940676,-0.3006338676001251,-0.6714352238128887],
        start_xy: [0,0]
      },
      {
        coefficients: [1.1633091208070712,-0.14544308410489992,-0.14209842824540564,-0.4877984653296874,0.5661398229818813,-1.1089585727278002,0.25296772597041306,0.40661662711016566,-0.03382689265395955,1.1851317798142282,0.00040512023067895697,-0.6546428845814504],
        start_xy: [0,0]
      },
      {
        coefficients: [0.4037493122400677,-0.6254416293658229,0.06391640041871893,-0.40832406985350733,-0.22167274555996797,0.09298427244172469,1.1738968193117054,0.7867886679330236,-0.19768443475701125,-0.895405923999635,0.5686786577449559,-0.061954560248064006],
        start_xy: [0,0]
      },
      {
        coefficients: [0.46571659479816274,-1.0283913029661875,0.35373666919124513,0.3440409220035403,-0.4052486169265881,0.3409752631172178,-0.126876039282108,1.1599117943228425,0.10363854719654109,0.12460126622689005,-1.1564314815119057,-0.4653281193303612],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.7095491069057136,0.24313522038759605,0.29218376557582504,0.8612431228862161,0.7608450199837196,1.0893848444478345,-1.0037209330229804,0.8356579423268211,-0.3917825906696347,0.361607060901185,0.7217689877764626,0.7142089334460149],
        start_xy: [0,0]
      },
      {
        coefficients: [0.0978847567861656,-0.3171309538471,1.0730223968482122,1.1982306380663423,-0.8561468467271782,-0.13479497034882248,0.4154124195618849,0.9701436218935864,-0.030068563476061794,-0.6009500542625386,-1.0520871954178699,0.771089744834494],
        start_xy: [0,0]
      },
      {
        coefficients: [-0.1653954225515628,-1.1479089347797633,-1.076408255289356,1.1376479922702718,0.6216720272662828,0.26213828124775995,0.014911693387409386,-0.4203490566155105,0.024927114696449815,0.9615875930780373,-1.1341799738794143,-0.8917473807746263],
        start_xy: [0,0]
      },
      {
        coefficients: [-1.2,0.45,0.36,1.03,-0.34,-0.25,-0.33,-1.25,-0.46,1.07,0.79,0.12],
        start_xy: [0,0]
      },
      {
        coefficients: [1.3362496523253498,-0.2907969650584532,-0.8167070084209775,0.1473579955483988,-0.9055761633520933,0.663942942174736,0.2666888639546434,-0.5624250791861731,1.464609585091944,0.40719797220188836,-0.8491793585010536,-0.02754381592955757],
        start_xy: [0.42492160726504435,0.2762511872628213]
      },
      {
        coefficients: [0.21703660695715898,-0.04307875437899278,0.18494559981404035,1.11520356224004,-0.3731745992225928,-0.3167474773283758,-1.0740912698267406,-0.017984302469348012,-0.6452936864209193,0.22216831766056688,0.6771652900925851,0.8147520777737016],
        start_xy: [0.42882937684247335,0.6881457059585925]
      },
      {
        coefficients: [-0.4711163539906025,-0.47699363287957186,-0.42402028198634234,-0.6633824240471238,-1.1622405046542978,-0.9229254426462121,-1.126022745824366,-1.345253655841782,-0.5063659165629328,-1.2239376402828117,-1.4098862638401524,0.41505528706980654],
        start_xy: [-0.7376336224812752,-1.474118157783573]
      },
      {
        coefficients: [0.34939661650338727,-0.2638079273812284,1.043010298642344,-1.4029216577200287,0.724444064218289,-0.28514141281811534,0.9905330152124261,1.1151782591186379,-0.19100604376976293,-0.47874251415509694,0.8353643415506147,-1.2817102035459302],
        start_xy: [0.28950272876921934,1.170360593764479]
      },
      {
        coefficients: [0.4101138850070343,0.1674994315791598,0.6872257898543723,-0.5540891676057733,0.0714137871441265,-1.4224562071258349,-1.0136853412728262,0.6619794102704657,0.7319137521019048,0.6550496917991611,0.6080395203823912,1.2657165192444904],
        start_xy: [-0.060597844586131266,0.7647690804543199]
      },
      {
        coefficients: [-0.23711531709263145,0.2033179066928088,0.6497924224490141,0.2832773002258684,-0.605763177763919,-0.4809234702288607,-1.3551249184303638,-1.0010678392480388,0.35740174821734483,0.34676211907006893,1.263188805618948,0.898608945708756],
        start_xy: [1.0467749809154903,1.0376067647718195]
      },
      {
        coefficients: [0.1037791488147628,-0.8065195006582593,-0.25097649723123516,1.4686099350826,-0.6249949252166003,-0.3494400374991802,-0.1666480247929567,0.20238036290952133,0.3241640857938206,0.821352410567795,0.9544059813125738,0.5204739799555775],
        start_xy: [0.39340169244040846,-0.8450745724529496]
      },
      {
        coefficients: [0.4153922318911474,-0.2513317672890796,-0.9738557714461726,1.4446527024478275,0.39797060331982737,-0.26100032352403346,-1.0135109846498387,-0.7741236121601685,-0.3185057258779287,-1.1051457628052708,-0.35152954321345486,0.8079123002257043],
        start_xy: [-1.385059231082153,-1.0598545400104251]
      },
      {
        coefficients: [0.9439820631308109,0.027979836080246345,-0.475414745271985,0.7253155981851513,0.4253970292967144,0.30614537520107676,-1.2360705758842112,-0.187065486923923,0.1664617928501384,0.4462349454332246,0.7192274036329516,0.8853838976124071],
        start_xy: [-0.17676328743458547,-1.4789719358010962]
      },
      {
        coefficients: [0.06827147898361452,-1.0678897297870122,-1.1770152824295521,0.18984842960037973,-0.3827455645671065,0.08725736675730822,-0.31534347329000445,-1.1780984497887235,0.3311894715476982,-0.0036817892696958676,0.19401435282291613,0.1910017124783041],
        start_xy: [0.9482405709454005,-0.9382032984811302]
      },
      {
        coefficients: [-0.4707283614515674,-0.6676866876444392,-0.3706428624403255,0.6132404474341175,0.5254731674581681,-0.5995490564929811,1.3328984031490538,0.017968382067290678,-1.040342209328114,1.27148877018231,1.4156467441299805,-1.292304030682895],
        start_xy: [-0.7387534396165698,-0.9103573368250475]
      },
      {
        coefficients: [-0.546353955689947,1.22448181837649,0.6711738114600756,-0.29788748591315506,0.304383971966979,-0.2031689038043898,0.15757387057319305,0.26366095287963853,-0.23426933345169276,-0.7381568911990617,-0.6702810211996029,0.7966302990104133],
        start_xy: [0.3712942971792561,-0.6771493781545352]
      },
      {
        coefficients: [0.6177148219122897,-1.3623293908491956,0.7016265459874793,-0.565071702485223,0.9975396856142211,0.7687341057533028,-0.5585105649844444,-0.8738234127459457,0.4958248652514665,-0.16851248767318294,-0.7323662271033733,1.2231848880129927],
        start_xy: [0.46805979786639496,0.05253081198855747]
      },
      {
        coefficients: [-1.373011535942821,-0.14505181328307404,0.015382994104956138,0.1789539422014006,-0.71058894327676,0.5312169957466333,-0.18206955702742644,-0.28725145053589074,-1.1818585225574385,-0.2183393002079006,1.0198876729500412,0.6159017293355982],
        start_xy: [0.707933261818078,-1.3373486925481628]
      },
      {
        coefficients: [0.8876261661690164,-1.0555452453119927,0.03344658278694146,-0.4748007278445323,0.6102820807580516,0.43725846086723097,1.2608109640405698,0.13840834009953773,-1.287176210751968,0.4360096112187195,0.5227461245716194,-0.35730299701140833],
        start_xy: [0.7268062053857824,-1.1123399754406025]
      },
      {
        coefficients: [0.1112201533871009,-1.2380549170959176,-0.6813794891533058,0.13331395883060004,-0.23715675603247233,-0.04114236375121583,0.8837881789041413,0.23696284441013238,-1.0419536340986362,-1.1758086711365265,0.08514931234955436,-1.3907977634818847],
        start_xy: [0.6841282385258127,-0.18334230303646626]
      }
    ]
  end

  # Delete only after having run this on production.
  # So far I've persisted the following attractor ids:
  # - Dev: 0..49
  # - Prod: None so far
  def self.save_nico_attractors(ids: nil)
    nico = User.find(1)
    attractors = self.attractors_to_save
    attractors = Array.wrap(attractors[ids]) if ids
    attractors.each do |a|
      nico.attractors.create!(details: a)
    end
  end
end
