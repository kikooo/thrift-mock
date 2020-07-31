namespace java com.maoyan.movie.gateway.poi.export

service TMaoyanGatewayCityMappingService {

    i32 getMtCityIdByDpCityId(1:i32 dpCityId);

    i32 getDpCityIdByMtCityId(1:i32 mtCityId);
}