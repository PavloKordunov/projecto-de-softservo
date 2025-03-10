package com.proj.forum.mapper;

public interface Mapper <S,T> {
    T mapToDto (S source);
    S mapToEntity (T source);
}
