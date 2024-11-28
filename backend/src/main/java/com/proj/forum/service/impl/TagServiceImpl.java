package com.proj.forum.service.impl;

import com.proj.forum.entity.Tag;
import com.proj.forum.entity.Topic;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.service.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
public class TagServiceImpl implements TagService {

    private TagRepository tagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository) {this.tagRepository = tagRepository;}

    @Override
    public List<Tag> getAllTags(){
        Iterable<Tag> all = tagRepository.findAll();
        log.info("getAllTags");
        return List.of(all.iterator().next());
    };
}
