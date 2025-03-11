package com.proj.forum.mapper.factory;

import com.proj.forum.mapper.Mapper;

public interface MapperFactory {
    <S, T> Mapper<S, T> getMapper(Class<? extends Mapper<S, T>> mapperClass);
}
