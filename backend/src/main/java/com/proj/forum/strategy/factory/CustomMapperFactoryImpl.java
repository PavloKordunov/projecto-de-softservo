package com.proj.forum.strategy.factory;

import com.proj.forum.strategy.CustomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomMapperFactoryImpl implements CustomMapperFactory {
    private final Map<String, CustomMapper<?,?>> mappers;

    @Override
    public <S, T> CustomMapper<S, T> getMapper(Class<? extends CustomMapper<S, T>> mapperClass) {
        return mapperClass.cast(mappers.get(mapperClass.getSimpleName()));
    }
}
