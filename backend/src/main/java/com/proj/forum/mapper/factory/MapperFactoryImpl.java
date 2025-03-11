package com.proj.forum.mapper.factory;

import com.proj.forum.mapper.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MapperFactoryImpl implements MapperFactory {
    private final Map<String, Mapper<?,?>> mappers;

    @Override
    public <S, T> Mapper<S, T> getMapper(Class<? extends Mapper<S, T>> mapperClass) {
        return mapperClass.cast(mappers.get(mapperClass.getSimpleName()));
    }
}
